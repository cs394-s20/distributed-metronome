import React, { useState } from 'react';
import '../../styles/styles.scss';

function Header(props) {
    let leaveButton;
    if (props.leaveButton){
        leaveButton = (<button class="button--orange" onClick={() => props.setPage('home')}>Leave Session</button>);
    }
    return (
        <div className="header">
            <h1>Metronome</h1>
            {leaveButton}
        </div>
    )
}

export default Header;