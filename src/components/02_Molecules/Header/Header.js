import React, { useState } from 'react';
import '../../../styles/styles.scss';

function Header(props) {
    let leaveButton;
    let roomCode;
    let roomCount;

    if (props.leaveButton){
         leaveButton = (<button className="button--orange" onClick={() => {props.setPage('home'); props.appClient.recorder.stopPlayBack();}}>Leave Session</button>);
    }

    if (props.roomCode){
        roomCode = (<span className="roomCode">Room Code: {props.appClient.roomClient.roomCode}</span>);
    }


    if (props.roomCount){
        var roomClient = props.appClient.roomClient;
        function UserCount(){
            let [count, setCount] = useState(1);
            roomClient.onListUsers = function(data){
                setCount(data.count)
            }.bind(setCount);
            return (
                <div id="user_count">
                    Users: {count}
                </div>
            )
        }
        UserCount = UserCount.bind(roomClient);
        roomCount = UserCount();
    }

    return (
        <div className="header">
            <h1>Metronome</h1>
            <div className="flexRow">
                <div className={(props.mode == "dark") ? "header__roomInfo textDarkMode" : "header__roomInfo textWhiteMode"}>
                    {roomCode}
                    {roomCount}
                </div>
                {leaveButton}
            </div>
        </div>
    )
}

export default Header;