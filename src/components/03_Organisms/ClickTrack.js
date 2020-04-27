import React, { useState } from 'react';

function ClickTrack(props) {
    const recorder = props.appClient.recorder;
    const [clickTrack, setClickTrack] = useState(false);
    const [playback, setPlayback] = useState(null);
    var btnMessage = clickTrack ? "Change Clicktrack:" : "Upload Clicktrack:";

    const uploadFile = event => {

        if (clickTrack) {
            // setPlayBack(false);
            setClickTrack(false);
            setPlayback(event.target.files[0])
        }
        else {
            // setPlayBack(true);
            setClickTrack(true);
            setPlayback(event.target.files[0])
        }
    }

    const playFile = () => {

    }

    return (
        <div style= {{backgroundColor: 'rgb(255, 213, 74)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        width: "430px",
        fontSize: "16px",
        borderRadius: "10px",
        color: 'white',
        border: 'none',
        margin: '10px'

        }}>
        {/* <button type="file" onClick={makeToggleRequest} className="button--yellow-long">{btnMessage}</button> */}
        <label for="file">{btnMessage}</label>
        <input type="file" accept="audio/*" onChange={uploadFile} style={{width:'50%'}}/>
        </div>
    );

}

export default ClickTrack;