class TestProcessor extends AudioWorkletProcessor {
  constructor (options) {
    super()
    
  }
  process (inputs, outputs) {
    console.log(inputs);
    console.log(outputs);
    return true
  }
}

registerProcessor('test-processor', TestProcessor)