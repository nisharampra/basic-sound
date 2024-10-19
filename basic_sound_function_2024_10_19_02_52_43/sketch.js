let mysound;
let playButton;
let stopButton;
let songSelector;

// Object to hold the song file paths
const songs = {
  "Song 1": "hard.mp3",
  "Song 2": "bleep_2.mp3",
  "Song 3": "c_major_theme.mp3",
};

// Variable to hold all loaded sounds
let loadedSounds = {};

function preload() {
  // Load all sound files in the preload function
  for (let song in songs) {
    loadedSounds[song] = loadSound(
      songs[song],
      () => {
        console.log(`Loaded sound: ${song}`);
      },
      (err) => {
        console.error("Error loading sound:", err);
      }
    );
  }
}

function setup() {
  createCanvas(400, 400);
  background(220);

  // Create the song selector
  songSelector = createSelect();
  songSelector.position(20, 20);
  songSelector.option("Song 1");
  songSelector.option("Song 2");
  songSelector.option("Song 3");
  songSelector.changed(changeSong);

  // Create the play button
  playButton = createButton("Play");
  playButton.position(20, 100);
  playButton.mousePressed(playSound);

  // Create the stop button
  stopButton = createButton("Stop");
  stopButton.position(80, 100);
  stopButton.mousePressed(stopSound);
}

// Function to change the song based on selection
function changeSong() {
  const selectedSong = songSelector.value();

  // Stop any currently playing sound
  if (mysound) {
    mysound.stop();
  }

  // Load the newly selected sound
  mysound = loadedSounds[selectedSong];

  if (mysound) {
    console.log(`Switched to: ${selectedSong}`);
  } else {
    console.error("Selected sound is not loaded");
  }
}

// Function to play the sound
function playSound() {
  if (mysound) {
    mysound.play();
  } else {
    console.error("No sound loaded to play");
  }
}

// Function to stop the sound
function stopSound() {
  if (mysound) {
    mysound.stop();
  }
}
