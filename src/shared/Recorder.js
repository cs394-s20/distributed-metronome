import audioBufferToWav from 'audiobuffer-to-wav';

Array.prototype.extend = function (other_array) {
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function (v) { this.push(v) }, this);
}

export default class Recorder {
    constructor(processor) {
        this.handleSuccess = this.handleSuccess.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        // this.startPlayBack = this.startPlayBack.bind(this);
        // this.stopPlayBack = this.stopPlayBack.bind(this);
        this.playBuffer = this.playBuffer.bind(this);
        this.saveRecording = this.saveRecording.bind(this);
        this.handlePlayback = this.handlePlayback.bind(this);
        this.startProcessor = this.startProcessor.bind(this);
        this.saveChunk.bind(this);
        this.context = null;
        this.playBackBuffer = null;
        this.source = null;
        this.chunks = [[], []];
        this.chunks_recorded = 0;
        this.chunks_returned = 0;
        this.onDownloadReady = null;
        this.lastChunk = -1;
        this.stream = null;
        this.processor_started = false;

        this.record = false;
        this.playback = false;
        this.processor = processor
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.handleSuccess);
    }

    handleSuccess = function (stream) {
        this.stream = stream;
        /*this.context = new AudioContext();
        const source = this.context.createMediaStreamSource(stream);
        const processor = this.context.createScriptProcessor(16384, 2, 1);

        source.connect(processor);
        processor.connect(this.context.destination);

        processor.onaudioprocess = function (e) {
            // Do something with the data, e.g. convert it to WAV

            if (this.record) {
                this.processor(e);
            }
        }.bind(this);*/

        return stream;
    };

    startProcessor = function(){
        this.context = new AudioContext();
        const source = this.context.createMediaStreamSource(this.stream);
        const processor = this.context.createScriptProcessor(16384, 2, 1);

        source.connect(processor);
        processor.connect(this.context.destination);

        processor.onaudioprocess = function (e) {
            // Do something with the data, e.g. convert it to WAV

            if (this.record) {
                this.processor(e);
            }
        }.bind(this);

        this.handlePlayback(this.stream);
    }

    handlePlayback = function (stream) {
        this.source = this.context.createMediaStreamSource(stream);
    };

    startRecording = function () {
        if (!this.processor_started){
            this.processor_started = true;
            this.startProcessor();
        }
        
        this.chunks = [[], []];
        this.chunks_recorded = 0;
        this.chunks_returned = 0;
        this.record = true;
    }

    stopRecording = function () {
        this.record = false;
        this.source.disconnect();

    }


    // startPlayBack = function () {
    //     this.source.connect(this.context.destination);
    // }

    // stopPlayBack = function () {
    //     this.source.disconnect();
    // }

    playBuffer(buffer) {
        var myArrayBuffer = this.context.createBuffer(2, 16384, 48000);

        for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {

            myArrayBuffer.copyToChannel(Float32Array.from(buffer[channel]), channel);

        }

        this.saveChunk(buffer);

    }

    saveChunk(buffer) {
        for (var c = 0; c < 2; c++) {
            this.chunks[c].extend(buffer[c]);
        }
    }

    // async saveRecording(){
    saveRecording() {


        var myArrayBuffer = this.context.createBuffer(2, this.chunks[0].length, 48000);

        for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {

            myArrayBuffer.copyToChannel(Float32Array.from(this.chunks[channel]), channel);

        }
        console.log(myArrayBuffer);
        console.log(audioBufferToWav(myArrayBuffer));


        var element = document.createElement('a');
        element.href = URL.createObjectURL(new Blob([new DataView(audioBufferToWav(myArrayBuffer))], {
            type: 'audio/wav'
        }));

        const name = prompt('Please enter a name for the recording!'); // prompts you to name the file
        element.download = name;

        // element.download = "recording.wav";
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // // --------- THE PLAYBACK PORTION ---------
        // var test = this.context.createBufferSource();

        // // set the buffer in the AudioBufferSourceNode
        // test.buffer = myArrayBuffer;

        // // connect the AudioBufferSourceNode to the
        // // destination so we can hear the sound
        // test.connect(this.context.destination);

        // // start the source playing
        // test.start();
        // // ----------------------------------------

        // if (this.playback) {
        //     var test = this.context.createBufferSource();
        //     test.buffer = myArrayBuffer;
        //     test.connect(this.context.destination);
        //     test.start();
        // }
    }

}

