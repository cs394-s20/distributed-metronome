import React from 'react';
import '../../styles/styles.scss';

function Home(props){
    const roomClient = props.appClient.roomClient;
    roomClient.onCreateRoom = function(e){
        roomClient.roomCode = e.code;
        props.setPage('startRecording');
    }
    return (
        <React.Fragment>
            <h2 className={(props.mode == "dark") ? "textDarkMode" : "textWhiteMode"}>The easy way to record and stream multipart pieces without any lag.</h2>
            <button className="button--green" onClick={() =>{roomClient.createRoom();
                console.log("hello");}}>Start Session</button>
            <button className="button--blue" onClick={() => props.setPage('joinSession')}>Join Session</button>
        </React.Fragment>
    )
}
export default Home;