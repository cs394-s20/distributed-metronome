import React, { useState } from 'react';

function ClickTrack(props) {
    const recorder = props.appClient.recorder;
    const [clickTrack, setClickTrack] = useState(false);
    var btnMessage = clickTrack ? "Change Clicktrack:" : "Upload Clicktrack:";

    const uploadFile = () => {
        if (clickTrack) {
            recorder.stopPlayBack();
            // props.setPlayBack(false);
            setClickTrack(false);
        }
        else {
            recorder.startPlayBack();
            // props.setPlayBack(true);
            setClickTrack(true);
        }
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