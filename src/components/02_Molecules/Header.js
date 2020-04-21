import React, { useState } from 'react';
import '../../styles/styles.scss';

function Header(props) {
    let leaveButton;
    let roomCount;

    if (props.leaveButton){
         leaveButton = (<button className="button--orange" onClick={() => props.setPage('home')}>Leave Session</button>);
        //leaveButton = (<button className="button--orange" onClick={() => window.location.reload(false)}>Leave Session</button>);
    }
    if (props.appClient.roomClient.roomCode){
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

    const handleChange = (event) => {
        //alert(event.target.value);
        if (event.target.value === "Dark") {
            document.body.style.backgroundColor = "";
            document.getElementsByClassName("content")[0].style.boxShadow = "";
            localStorage.setItem("bgColor", "");
            localStorage.setItem("bgBoxShadow", "");
        }
        else if (event.target.value === "White") {
            document.body.style.backgroundColor = "white";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(255, 255, 255, 0.5)";
            localStorage.setItem("bgColor", "white");
            localStorage.setItem("bgBoxShadow", "inset 2000px 0 0 0 rgba(255, 255, 255, 0.5)");
        }
        else if (event.target.value === "Green") {
            document.body.style.backgroundColor = "green";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(0, 255, 0, 0.5)";
            localStorage.setItem("bgColor", "green");
            localStorage.setItem("bgBoxShadow", "inset 2000px 0 0 0 rgba(0, 255, 0, 0.5)");
        }
    }

    return (
        <div className="header">
            <h1>Metronome</h1>
            <div className="flexRow">
            <select className="select-bg" onChange = {handleChange}>
                <option value ="Dark">Dark</option>
                <option value ="White">White</option>
                {/* <option value="Green">Green</option> */}
            </select>
            {leaveButton}
            {roomCount}
            </div>
        </div>
    )
}

export default Header;