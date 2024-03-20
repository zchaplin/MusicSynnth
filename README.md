<!-- @format -->

# Custom Digital Synthesizer \### Zane Chaplin zchaplin 1887076 3/19/2024

[Check Out The Synthesizer Here](https://zchaplin.github.io/MusicSynnth/)

## Synthesis Description

In this digital synthesizer, I employ various audio synthesis techniques to generate and manipulate sounds in real-time. The heart of the synthesizer revolves around calculating waveform samples dynamically, using distinct mathematical formulas for each type of waveform. The core waveforms include:

- **Sine Wave**: Defined by \(y(t) = sin(2\*pi\*f\*t)\), where \(f\) is the frequency.
- **Square Wave**: Creates its characteristic sound by switching between values of 1 and -1.
- **Sawtooth Wave**: Given by \(y(t) = 2\((t/T) - (1/2 + t/T))) , with \(T\) representing the period.
- **Triangle Wave**: Produces a linear ramp up and down, transitioning smoothly between -1 and 1.

Complexity in the sound is introduced through the mixing of primary and secondary waveforms, alongside harmonies, achieved via frequency modulation and mixing techniques. Additionally, the dynamic inclusion of noise and harmonics, adjustable through user input, further enhances the timbral possibilities of the synthesizer.

### Harmonies Calculation

Harmonies are calculated based on musical intervals, represented in semitones, relative to the base frequency. When a user selects a number of harmonies, each harmony is tuned to a frequency that is a specific interval above the base frequency. This interval is calculated using the formula:

\[ f\_{harmony} = f_harmony = f_base \* 2^(n/12)]

where \(f*{base}\) is the base frequency, \(n\) is the number of semitones above the base frequency, and \(f*{harmony}\) is the resulting frequency of the harmony.

### Noise Addition

Noise is added to the signal to introduce texture and variation. The amount of noise can be controlled by the user via the "noiseSlider". The noise is mixed into the waveform by slightly altering the frequency of each sample based on a random factor, making the sound more vibrant and less predictable. The alteration is calculated as follows:

f_altered = f \* (1 + (noise_level \* (random value))/100)

where \(f\) is the original frequency, \(noise_level\) is the value from the noise slider, and \(random \, value\) is a random number between -1 and 1, altering the frequency slightly to add the noise effect.

## User Manual

### Getting Started

- **Start Synthesis**: Click the "START SYNTHESIS" link to begin audio playback.

### Controls

- **Waveform Selection**: Use the provided dropdown menus to select primary and secondary waveforms for mixing. A third dropdown allows selection of a waveform type specifically for harmonies.
- **Adding Noise**: The "noiseSlider" can be adjusted to introduce random fluctuations in the frequency, adding texture to the sound.
- **Harmonies**: Add harmonics with the "upperHarmonySlider", enriching the sound with musical intervals.
- **Base Frequency Adjustment**: The "baseFrequencySlider" allows for the adjustment of the pitch of the base note, controlling the foundational frequency of the sound.
- **Harmony Waveform Type**: Select a unique waveform for the harmonies through the "harmonyWaveformTypeSelector" to diversify the sound texture.

### Functional Overview

- **onUserWantsToStart()**: Initializes the audio context and starts audio processing.
- **add_noise() / reset_noise()**: Introduces or removes noise in the signal, altering the sound's texture.
- **updateFrequencies()**, **set_frequencies()**: These functions adjust the harmonic content based on user input, enriching the sound.
- **getSample()**: Calculates the composite audio signal by blending selected waveforms and harmonics, culminating in the final output.

### Note

This synthesizer is designed for intuitive exploration and creation of a wide range of sounds. Simply interact with the sliders and selectors to discover the diverse sonic landscapes you can create.
