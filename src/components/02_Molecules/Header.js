import React, { useState } from 'react';
import '../../styles/styles.scss';

function Header(props) {
    return (
        <React.Fragment>
            <h1>Metronome</h1>
            <button class="button--orange" onClick={() => props.setPage('home')}>Join Session</button>
        </React.Fragment>
    )
}

export default Header;