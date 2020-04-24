import RoomClient from './RoomClient';
import Recorder from './Recorder';

export default class AppClient {
    constructor(){
        this.roomClient = new RoomClient('wss://dm.johnflaboe.com');
        this.recorder = new Recorder();

        this.roomClient.onData = function(e){
            console.log(e.id);
            e = e.channels;
            e[0] = new Float32Array(e[0]);
            e[1] = new Float32Array(e[1]);
            this.recorder.playBuffer(e);
        }.bind(this);

        this.recorder.processor = function(e){
            var channels = [];
            channels.push(Array.prototype.slice.call(e.inputBuffer.getChannelData(0)));
            channels.push(Array.prototype.slice.call(e.inputBuffer.getChannelData(1)));
            this.roomClient.sendMedia({channels: channels, id: ++this.recorder.chunks_recorded});
        }.bind(this);
    }



}
