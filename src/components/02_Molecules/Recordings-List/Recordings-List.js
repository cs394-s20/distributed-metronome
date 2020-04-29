import React, { useState } from 'react';
import '../../../styles/styles.scss';

function Recordings_list(props) {
    return (
        <div className="recordings-list">
            <h3>Uploaded Files</h3>
            <h5 onClick={() => {}}>clicktrack1.mp3</h5>
            <h5 onClick={() => {}}>clicktrack2.mp3</h5>
            <h5 onClick={() => {}}>background-instrument-1.wav</h5>
            <h5 onClick={() => {}}>background-instrument-2.wav</h5>
        </div>
    )
}

export default Recordings_list;