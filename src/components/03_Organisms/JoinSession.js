import React from 'react';
import '../../styles/styles.scss';


function JoinSession(props) {
    const roomClient = props.appClient.roomClient;
    roomClient.onJoinRoom = function(e){
        if (e.code !== null){
            roomClient.roomCode = e.code;
            props.setPage('startRecording');
            
        }
    }
    return (
        <form>
            <div className="flexRow alignItemsCenter">
                <p>Session Code:</p>
                <input id="input-text" type="text" />
            </div>
            <div className="flexRow justifyContentCenter">
                <input type="button" value="Back" className="button--red button--small" onClick={() => props.setPage('home')} />
                <input type="button" value="Enter" className="button--green button--small" onClick={() => roomClient.joinRoom(document.getElementById("input-text").value)}/>
            </div>
        </form>
    )
}
export default JoinSession;