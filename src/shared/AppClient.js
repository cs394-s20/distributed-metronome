import RoomClient from './RoomClient';
import Recorder from './Recorder';

export default class AppClient {
    constructor(){
        this.roomClient = new RoomClient('ws://3.22.61.250:3002');
        // this.roomClient = new RoomClient('ws://localhost:5000');

        this.recorder = new Recorder();

        this.isFinal = false;

        this.roomClient.onData = function(e, isFinal){
            var i = e.id;
            e = e.channels;
            e[0] = new Float32Array(e[0]);
            e[1] = new Float32Array(e[1]);
            this.recorder.playBuffer(e);
            this.recorder.chunks_returned += 1;
            if (!this.recorder.record && this.recorder.lastChunk === i){
                console.log("hello again");
                this.recorder.onDownloadReady();
            }
        }.bind(this);

        this.recorder.processor = function(e){
            var channels = [];
            channels.push(Array.prototype.slice.call(e.inputBuffer.getChannelData(0)));
            channels.push(Array.prototype.slice.call(e.inputBuffer.getChannelData(1)));
            this.roomClient.sendMedia({channels: channels, id: ++this.recorder.chunks_recorded}, this.isFinal );
        }.bind(this);
    }



}
