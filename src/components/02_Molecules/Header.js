import React from 'react';
import '../../styles/styles.scss';

function Header(props) {
    let leaveButton;

    if (props.leaveButton){
        // leaveButton = (<button className="button--orange" onClick={() => props.setPage('home')}>Leave Session</button>);
        leaveButton = (<button className="button--orange" onClick={() => window.location.reload(false)}>Leave Session</button>);
    }

    const handleChange = (event) => {
        //alert(event.target.value);
        if (event.target.value === "Dark") {
            document.body.style.backgroundColor = "";
            document.getElementsByClassName("content")[0].style.boxShadow = "";
        }
        else if (event.target.value === "White") {
            document.body.style.backgroundColor = "white";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(255, 255, 255, 0.5)";
        }
        else if (event.target.value === "Green") {
            document.body.style.backgroundColor = "green";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(0, 255, 0, 0.5)";
        }
    }

    return (
        <div className="header">
            <h1>Metronome</h1>
            <div className="flexRow">
            <select className="select-bg" onChange = {handleChange}>
                <option value ="Dark">Dark</option>
                <option value ="White">White</option>
                <option value="Green">Green</option>
            </select>
            {leaveButton}
            </div>
        </div>
    )
}

export default Header;