/** @format */
var audioContext = new AudioContext();
var bufferSource = audioContext.createBufferSource();
var scriptProcessor = audioContext.createScriptProcessor(4096, 0, 1);

scriptProcessor.onaudioprocess = function (audioProcessingEvent) {
  getBuffer(audioProcessingEvent.outputBuffer);
};

var noise_track = 0;

function add_noise() {
  console.log(noise_track);
  noise_track += 1;
}

function reset_noise() {
  noise_track = 0;
}

function onUserWantsToStart() {
  bufferSource = audioContext.createBufferSource();
  bufferSource.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}

function getBuffer(outputBuffer) {
  var outputData = outputBuffer.getChannelData(0);
  var sampleRate = outputBuffer.sampleRate;
  for (var i = 0; i < outputBuffer.length; i++) {
    outputData[i] = getSample(sampleRate);
  }
}

// Corrected: Initialize slider for noise control
var noiseSlider = document.getElementById("noiseSlider");
noiseSlider.addEventListener("input", function () {
  noise_track = parseInt(this.value);
  console.log(noise_track);
});

base_frequency = 440;
var baseFrequencySlider = document.getElementById("baseFrequencySlider");
baseFrequencySlider.addEventListener("input", function () {
  base_frequency = parseInt(this.value);
  updateFrequencies();
});

var frequencies = [base_frequency];
function updateFrequencies() {
  set_frequencies(upperHarmonySlider.value); // Assuming `upperHarmonySlider.value` holds the count
}
function set_frequencies(count) {
  frequencies = [base_frequency]; // Clear frequencies
  phi = []; // Clear and prepare to reset phase accumulators
  for (let i = 0; i < count; i++) {
    frequencies.push(base_frequency * Math.pow(2, upper_harmonies[i] / 12));
    phi.push(0); // Initialize phase accumulator for this frequency
  }
}

// Assuming you have an upperHarmonySlider element in your HTML
var upperHarmonySlider = document.getElementById("upperHarmonySlider");
upperHarmonySlider.addEventListener("input", function () {
  var count = parseInt(this.value);
  set_frequencies(count); // Assuming you meant to call set_frequencies
});

// Harmonies to be used when setting frequencies
var upper_harmonies = [4, 7, 11, 14, 17, 21, 24];
function getDelta(freq, sampleRate) {
  return (freq * 2 * Math.PI) / sampleRate;
}
function getDelta(freq, sampleRate) {
  var delta =
    ((freq * 2 * Math.PI) / sampleRate) *
    ((100 - noise_track * Math.random()) / 100);
  return delta;
}

var phi = new Array(frequencies.length).fill(0); // Store phi for each frequency
max_amplitude = 0.1;
function getWaveformValue(type, phase) {
  switch (type) {
    case "sine":
      return Math.sin(phase);
    case "square":
      return Math.sign(Math.sin(phase));
    case "sawtooth":
      return (
        2 * (phase / (2 * Math.PI) - Math.floor(0.5 + phase / (2 * Math.PI)))
      );
    case "triangle":
      return (
        Math.abs(
          4 *
            (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.75)) -
            1
        ) - 1
      );
    default:
      return 0; // Default to silence if unknown type
  }
}

// Variables for both primary and secondary waveform types
var primaryWaveformType = "sine";
var secondaryWaveformType = "none"; // Default to 'none' for secondary

// Update the primary waveform type based on user selection
document
  .getElementById("primaryWaveformTypeSelector")
  .addEventListener("change", function () {
    primaryWaveformType = this.value;
  });

// Update the secondary waveform type based on user selection
document
  .getElementById("secondaryWaveformTypeSelector")
  .addEventListener("change", function () {
    secondaryWaveformType = this.value;
  });

var harmonyWaveformType = "sine"; // Default waveform type for harmonies

// Update the harmony waveform type based on user selection
document
  .getElementById("harmonyWaveformTypeSelector")
  .addEventListener("change", function () {
    harmonyWaveformType = this.value;
  });

// Assuming your existing getWaveformValue function and other setup

// Example modification to getSample to use harmonyWaveformType for harmonies
function getSample(sampleRate) {
  var sample = 0;
  // Assume the first frequency is the base and the rest are harmonies
  frequencies.forEach((freq, index) => {
    if (!phi[index]) phi[index] = 0;
    phi[index] += getDelta(freq, sampleRate);
    if (index === 0) {
      // Base frequency uses primary waveform
      sample += getWaveformValue(primaryWaveformType, phi[index]);
      if (secondaryWaveformType !== "none") {
        // Mix with secondary if chosen
        sample += getWaveformValue(secondaryWaveformType, phi[index]);
        sample /= 2; // Average the base waveforms
      }
    } else {
      // Harmonies use their selected waveform type
      sample += getWaveformValue(harmonyWaveformType, phi[index]);
    }
  });
  return (max_amplitude * sample) / frequencies.length; // Normalize amplitude
}
