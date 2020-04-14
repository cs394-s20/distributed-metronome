export default class RoomClient {
<<<<<<< HEAD
    constructor(url, onMetronomeStart = function (data) { console.log("start_metronome") },
        onMetronomeStop = null,
        onListRoom = null,
        onData = function (data) { console.log(data); }) {

=======
    constructor(url, onMetronomeStart = function(data){console.log("start_metronome")}, onMetronomeStop = null, onListRoom = null) {
        // console.log("Starting RoomClient")
>>>>>>> server
        this.url = url;
        this.websocket = null;
        this.onMetronomeStart = this.doNothing;
        this.onMetronomeStop = this.doNothing;
        this.onListRoom = this.doNothing;
<<<<<<< HEAD
        this.onData = this.doNothing;
=======
>>>>>>> server

        if (onMetronomeStop) {
            this.onMetronomeStop = onMetronomeStop;
        }

        if (onMetronomeStart) {
            this.onMetronomeStart = onMetronomeStart;
        }

        if (onListRoom) {
            this.onListRoom = onListRoom;
        }
<<<<<<< HEAD

        if (onData) {
            this.onData = onData;
        }

=======
        
>>>>>>> server
        this.connect = this.connect.bind(this);
        this.attachProcessors = this.attachProcessors.bind(this);
        this.send = this.send.bind(this);
        this.startMetronome = this.startMetronome.bind(this);
        this.stopMetronome = this.stopMetronome.bind(this);
        this.sendVideo = this.sendVideo.bind(this);

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
<<<<<<< HEAD
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

=======
        this.websocket.onopen = function(event){
            console.log("connection opened");
        }
        this.websocket.onmessage = this.handleMessage.bind(this);
            
    }

    handleMessage(event){
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
                default:
                    console.log("unknown data received");;
            }
    }

    send(data){
        
        if (this.websocket.readyState === 1){
            this.websocket.send(data);
        }
        
    }

    startMetronome(){
        
>>>>>>> server
        let message = {
            "type": "start_metronome"
        };

        this.send(JSON.stringify(message));
    }

<<<<<<< HEAD
    stopMetronome() {
=======
    stopMetronome(){
>>>>>>> server
        let message = {
            "type": "stop_metronome"
        };

        this.send(JSON.stringify(message));
    }

<<<<<<< HEAD
    sendVideo(data) {
=======
    sendVideo(data){
>>>>>>> server
        let message = {
            "type": "data",
            "data": data
        };

        this.send(JSON.stringify(message));
    }

}