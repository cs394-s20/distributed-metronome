export default class RoomClient {
    constructor(url) {
        this.roomCode = null;
        this.url = url;
        this.websocket = null;
        this.onMetronomeStart = this.doNothing;
        this.onMetronomeStop = this.doNothing;
        this.onListRoom = this.doNothing;
        this.onData = this.doNothing;
        this.onCreateRoom = this.doNothing;
        this.onJoinRoom = this.doNothing;
        this.onListUsers = this.doNothing;
        this.twitch = false;

        this.connect = this.connect.bind(this);
        this.attachProcessors = this.attachProcessors.bind(this);
        this.send = this.send.bind(this);
        this.startMetronome = this.startMetronome.bind(this);
        this.stopMetronome = this.stopMetronome.bind(this);
        this.sendMedia = this.sendMedia.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);

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
            case "create_room":
                this.onCreateRoom(data.data);
                break;
            case "join_room":
                this.onJoinRoom(data.data);
                break;
            case "list_users":
            console.log(data.data)
                this.onListUsers(data.data)
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
            "type": "start_metronome",
            "ts": (new Date()).getTime(),
            "twitch": this.twitch
        };

        this.send(JSON.stringify(message));
    }

    stopMetronome() {
        let message = {
            "type": "stop_metronome",
            "ts": (new Date()).getTime()
        };

        this.send(JSON.stringify(message));
    }

    sendMedia(data) {
        let message = {
            "type": "data",
            "ts": (new Date()).getTime(),
            "data": data
        };

        this.send(JSON.stringify(message));
    }

    createRoom(){
        let message = {
            "type" : "create_room",
            ts: (new Date()).getTime()
        }

        this.send(JSON.stringify(message));
    }

    joinRoom(code){
        let message = {
            "type" : "join_room",
            ts: (new Date()).getTime(),
            "data": {
                "code": code
            }
        }

        this.send(JSON.stringify(message));
    }

    startTwitch() {
        this.twitch = true;
    }

    stopTwitch() {
        this.twitch = false;
    }

}
