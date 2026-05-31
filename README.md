# Bingo Caller

A web-based bingo number caller application with text-to-speech support and customizable audio settings.

## Live
Try it out here: [https://albus-percival.github.io/bingo-caller/](https://albus-percival.github.io/bingo-caller/)

## Features

- **90-number bingo board**: Display all numbers 1-90 in a grid layout
- **Random number selection**: Click "Next" to randomly select and call the next number
- **Visual tracking**: Called numbers are highlighted on the board
- **Last 3 numbers**: Display the most recently called numbers for quick reference
- **Text-to-Speech (TTS)**: Hear the called numbers spoken aloud with customizable voice
- **Audio customization**:
  - Multiple voice options (English voices available)
  - Adjustable speech rate (0.5x to 3x)
  - Adjustable pitch (0 to 2)
  - Repeat count (1-3 times per number)
- **Persistent state**: Game progress is saved to cookies, so you can resume where you left off
- **Restart button**: Clear all called numbers and start a new game

## How to Use

1. Open `index.html` in your web browser
2. **Select a voice**: Choose a voice from the "Voices" dropdown to enable audio
3. **Click "Next"**: Randomly call the next number
   - The number appears on the board, highlighted in white
   - It's added to the "Last 3" section
   - The TTS voice reads the number aloud
4. **Adjust audio settings** (optional):
   - **Repeat**: How many times to repeat each number (1-3)
   - **Rate**: Speed of speech (0.5 = half speed, 1 = normal, 3 = triple speed)
   - **Pitch**: Tone of voice (0 = lowest, 1 = normal, 2 = highest)
5. **Restart**: Click "Restart" and confirm to clear all called numbers and start over

## Audio

- Select "Audio Off" to disable text-to-speech
- The application includes creative callouts for each number (e.g., "Two peas in a pod", "Lucky seven")
- Browser must support the Web Speech API for audio features

## Persistence

Game progress is automatically saved to your browser's cookies. If you close the browser and return, your game state will be restored.

## Browser Compatibility

- Works on all modern browsers with Web Speech API support
- Tested on Chrome, Firefox, Edge, and Safari
- Requires JavaScript enabled