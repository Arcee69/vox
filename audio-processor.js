// audio-processor.js

class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
    }
  
    process(inputs,) {
      // Get audio input
      const input = inputs[0];
      if (input.length > 0) {
        const inputChannel = input[0]; // Use the first channel
  
        // Send audio data to the main thread
        this.port.postMessage(inputChannel);
      }
      return true; // Keep the processor alive
    }
  }
  
  registerProcessor('audio-processor', AudioProcessor);
  