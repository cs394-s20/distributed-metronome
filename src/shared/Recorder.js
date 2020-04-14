export default class Recorder {
    constructor(processor) {
        this.handleSuccess = this.handleSuccess.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.playBuffer = this.playBuffer.bind(this);

        this.record = false;
        this.processor = processor
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.handleSuccess);
    }

    handleSuccess = function (stream) {
        const context = new AudioContext();
        const filt = context.createBiquadFilter();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(8192, 2, 1);
        
        
        
        
        source.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = function (e) {
            // Do something with the data, e.g. convert it to WAV
            
            if (this.record) {
                this.processor(e);
            }
        }.bind(this);

        
    };

    startRecording = function () {
        this.record = true;
    }

    stopRecording = function () {
        this.record = false;
    }

    playBuffer(buffer){
        const context = new AudioContext();
        var myArrayBuffer = context.createBuffer(2, 8192, 48000);
        for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
            
            myArrayBuffer.copyToChannel(Float32Array.from(buffer[channel]), channel);
            
        }
        console.log(myArrayBuffer);
        
        var test = context.createBufferSource();

        // set the buffer in the AudioBufferSourceNode
        test.buffer = myArrayBuffer;

        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        test.connect(context.destination);

        // start the source playing
        test.start();

    }

}

