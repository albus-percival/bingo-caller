class Voice {
	#synth = null;
	#voices;
	#selectorNode;
	#rateNode;
	#pitchNode;
	#repeatNode;
	#phrases = [
		'Zero is nothing', // 0
		'One is the loneliest number', // 1
		'Two peas in a pod', // 2
		'Three strikes and you\'re out', // 3
		'Four-leaf clover, lucky you', // 4
		'A high five', // 5
		'Six-pack abs', // 6
		'Seven wonders of the world', // 7
		'Eight ball, corner pocket', // 8
		'Nine lives of a cat', // 9
		'Ten out of ten dentists agree', // 10
		'Eleven pipers piping', // 11
		'Twelve eggs in a dozen', // 12
		'Thirteen, unlucky for some', // 13
		'Fourteen days in a fortnight', // 14
		'Fifteen minutes of fame', // 15
		'Sweet sixteen and never been kissed',
		'Seventeen magazine, but who reads magazines anymore?',
		'Eighteen and legal (but still can\'t rent a car)',
		'Nineteen, almost twenty',
		'Twenty-twenty vision, but still can\'t see the future',
		'Twenty-one, finally legal',
		'Catch-22, can\'t win',
		'Michael Jordan\'s number, but I can\'t dunk',
		'Two dozen donuts, because one dozen isn\'t enough',
		'Quarter-life crisis',
		'Twenty-six letters in the alphabet, but still can\'t spell',
		'Club 27, rock stars only',
		'Twenty-eight days later (zombie movie)',
		'Leap year, because why not?',
		'Dirty thirty, time to adult',
		'Baskin-Robbins flavors, but I always get vanilla',
		'Thirty-two teeth, but I still need braces',
		'Thirty-three, the age of wisdom (or so they say)',
		'Thirty-four, almost mid-thirties',
		'Thirty-five, halfway to seventy',
		'Thirty-six, still young at heart',
		'Thirty-seven, prime number, prime time',
		'Thirty-eight, feeling great',
		'Thirty-nine, almost over the hill',
		'Life begins at forty, or so they say',
		'Forty-one, still having fun',
		'Answer to life, the universe, and everything',
		'Forty-three, still free',
		'Forty-four, knocking on heaven\'s door',
		'Forty-five, still alive',
		'Forty-six, in the mix',
		'Forty-seven, almost to heaven',
		'Forty-eight, feeling great',
		'Forty-nine, almost fifty',
		'Half a century, but who\'s counting?',
		'Area 51, where the aliens are',
		'Fifty-two card pickup',
		'Fifty-three, still me',
		'Studio 54, disco fever',
		'Double nickels',
		'Fifty-six, in the mix',
		'Heinz 57, variety is the spice of life',
		'Fifty-eight, feeling great',
		'Fifty-nine, almost sixty',
		'Sixty, nifty and thrifty',
		'Sixty-one, still having fun',
		'Sixty-two, still you',
		'Sixty-three, still free',
		'Nintendo 64, classic gaming',
		'Sixty-five, Medicare time',
		'Route 66, get your kicks',
		'Sixty-seven, almost to heaven',
		'Sixty-eight, feeling great',
		'Sixty-nine, nice',
		'Seventy, still heavenly',
		'Seventy-one, still having fun',
		'Seventy-two, still you',
		'Seventy-three, still free',
		'Seventy-four, knocking on heaven\'s door',
		'Diamond anniversary, but still can\'t afford diamonds',
		'Spirit of \'76, revolutionary',
		'Seventy-seven, almost to heaven',
		'Seventy-eight, feeling great',
		'Seventy-nine, almost eighty',
		'Eighty, still nifty',
		'Eighty-one, still having fun',
		'Eighty-two, still you',
		'Eighty-three, still free',
		'Eighty-four, knocking on heaven\'s door',
		'Eighty-five, still alive',
		'Eighty-six, in the mix',
		'Eighty-seven, almost to heaven',
		'Eighty-eight, feeling great',
		'Eighty-nine, almost ninety',
		'Ninety, still spry and wily',
	];
	constructor() {
		try {
			this.#synth = window.speechSynthesis;
			this.#voices = this.#synth.getVoices().filter(v => v.lang === 'en-US');
			this.#selectorNode = document.querySelector('#voices');
			this.#selectorNode.innerHTML = `<option value="none">Audio Off</option>`;
			this.#rateNode = document.querySelector('#rate');
			this.#pitchNode = document.querySelector('#pitch');
			this.#repeatNode = document.querySelector('#repeat');
		} catch (error) {
			this.#synth = null;
			return;
		}
		for(const v of this.#voices) {
			this.#selectorNode.insertAdjacentHTML('beforeend', `<option value="${v.voiceURI}">${v.name}</option>`);
		}
		this.#selectorNode.addEventListener('change', () => {
			this.speak('Audio On');
		});
	}
	get #rate() {
		let rate = this.#rateNode?.value ?? 1;
		rate = parseFloat(rate);
		return isNaN(rate) ? 1 : rate;
	}
	get #pitch() {
		let pitch = this.#pitchNode?.value ?? 1;
		pitch = parseFloat(pitch);
		return isNaN(pitch) ? 1 : pitch;
	}
	get #repeat() {
		let repeat = this.#repeatNode?.value ?? 1;
		repeat = parseInt(repeat);
		return isNaN(repeat) ? 1 : repeat;
	}
	speak(text) {
		if(!this.#synth) {
			return;
		}
		const voice = this.#voices.find(v => v.voiceURI === this.#selectorNode.value);
		if(!voice) {
			// Audio Off
			return;
		}
		let repeat = this.#repeat;
		if(repeat > 1) {
			const copy = text;
			text = [];
			for(let i = 0; i < repeat; i++) {
				text.push(copy);
			}
			text = text.join('. ');
		}
		const utterThis = new SpeechSynthesisUtterance(text);
		utterThis.voice = voice;
		utterThis.rate = this.#rate;
		utterThis.pitch = this.#pitch;
		
		this.#synth.speak(utterThis);
	}
}

class Game {
	static #ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	static #teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
	static #tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

	static #doneNode = document.querySelector('#done');
	static #boardNode = document.querySelector('#board');
	static #voice = new Voice;

	#done = [];
	#pool = [];
	static #numToWord(n, sep = ';') {
		if(n < 10) {
			return `${Game.#ones[n]}${sep} only${sep} ${Game.#ones[n]}`;
		}
		const tensDigit = Game.#ones[Math.floor(n / 10)];
		const onesDigit = Game.#ones[n % 10];
		const ret = `${tensDigit}${sep} ${onesDigit}`;
		if(n < 20) {
			return `${ret}${sep} ${Game.#teens[n - 10]}`;
		}
		const tens = Game.#tens[Math.floor(n / 10) - 2];
		if(n % 10 === 0) {
			return `${ret}${sep} ${tens}`;
		}
		const ones = Game.#ones[n % 10];
		return `${ret}${sep} ${tens} ${ones}`;
	}
	constructor(called = null) {
		this.#pool = Array.from({ length: 90 }, (_, i) => i + 1);
		
		// Create Board
		Game.#boardNode.innerHTML = this.#pool.map(num => `<span class="cell" data-num="${num}">${num}</span>`).join('');

		// Load called numbers
		if(Array.isArray(called)) {
			this.#done = called;
			// Remove from pool
			this.#pool = this.#pool.filter(num => !this.#done.includes(num));
			// Update UI
			for(const d of this.#done) {
				document.querySelector(`[data-num="${d}"]`).classList.add('done');
			}
			Game.#doneNode.innerHTML = this.#done.slice(-3).map(d => `<span class="cell done">${d}</span>`).join('');
		} else {
			Game.#doneNode.innerHTML = '';
		}
	}
	next() {
		if(this.#pool.length === 0) {
			Game.#voice.speak('Game over');
			alert('Game over');
			return;
		}
		const index = Math.floor(Math.random() * this.#pool.length);
		// const index = 0; // for testing
		const num = this.#pool.splice(index, 1)[0];
		// Push to done
		this.#done.push(num);
		// Update UI
		document.querySelector(`[data-num="${num}"]`).classList.add('done');
		Game.#doneNode.insertAdjacentHTML('beforeend', `<span class="cell done">${num}</span>`);
		const doneNodes = [...Game.#doneNode.querySelectorAll('.cell')];
		if(doneNodes.length > 2) {
			for(let i = 0, j = doneNodes.length - 3; i < j; i++) {
				doneNodes[i].remove();
			}
		}
		// Speak
		Game.#voice.speak(Game.#numToWord(num));
		// Save as cookie
		document.cookie = `done=${JSON.stringify(this.#done)}`;
	}
}
// Load game from cookie
let game = null;
{
	const done = document.cookie.split('; ').find(row => row.startsWith('done='));
	if(done) {
		const called = JSON.parse(done.slice(5));
		game = new Game(called);
	} else {
		game = new Game();
	}
}
document.querySelector('#next').addEventListener('click', () => {
	game.next();
});
document.querySelector('#restart').addEventListener('click', () => {
	if(confirm('Do you want to restart the game?')) {
		// Clear cookie
		document.cookie = 'done=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		game = new Game();
	}
});