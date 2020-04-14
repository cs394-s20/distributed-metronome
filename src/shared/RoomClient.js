export default class RoomClient {
    constructor(url) {

        this.url = url;
        this.websocket = null;
        this.onMetronomeStart = this.doNothing;
        this.onMetronomeStop = this.doNothing;
        this.onListRoom = this.doNothing;
        this.onData = this.doNothing;

        this.connect = this.connect.bind(this);
        this.attachProcessors = this.attachProcessors.bind(this);
        this.send = this.send.bind(this);
        this.startMetronome = this.startMetronome.bind(this);
        this.stopMetronome = this.stopMetronome.bind(this);
        this.sendMedia = this.sendMedia.bind(this);

        this.connect();
        this.attachProcessors();
    }

    connect() {
        this.websocket = new WebSocket(this.url);
    }

    doNothing() {
        return;
    }

    attachProcessors() {
        this.websocket.onopen = function (event) {
            console.log("connection opened");
        }
        this.websocket.onmessage = this.handleMessage.bind(this);

    }

    handleMessage(event) {
        let data = JSON.parse(event.data);
        switch (data.type) {
            case "start_metronome":
                this.onMetronomeStart(data.data);
                break;
            case "stop_metronome":
                this.onMetronomeStop(data.data);
                break;
            case "list_room":
                this.onListRoom(data.data);
                break;
            case "data":
                this.onData(data.data);
                break;
            default:
                console.log("unknown data received");;
        }
    }

    send(data) {

        if (this.websocket.readyState === 1) {
            this.websocket.send(data);
        }

    }

    startMetronome() {

        let message = {
            "type": "start_metronome"
        };

        this.send(JSON.stringify(message));
    }

    stopMetronome() {
        let message = {
            "type": "stop_metronome"
        };

        this.send(JSON.stringify(message));
    }

    sendMedia(data) {
        let message = {
            "type": "data",
            "data": data
        };

        this.send(JSON.stringify(message));
    }

}