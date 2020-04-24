import React, { useState } from 'react';

import Countdown from 'react-countdown-now';

function FancyButton(props) {
    const [startCount, setStartCount] = useState(false);
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [downloadVisible, setDownloadVisible] = useState(false);
let downloadButton = downloadVisible ? <button onClick={() => recorder.saveRecording()} disabled = {downloadDisabled} className={downloadDisabled ? null : "button--purple"} >{downloadDisabled ? 'Please wait...' : 'Download!'}</button> : "";

    const roomClient = props.appClient.roomClient;
    const recorder = props.appClient.recorder;
    const makeToggleRequest = () => {
        if (props.record) {
            props.setAnimationVisible(false);
            roomClient.stopMetronome();
            document.getElementById("fancy-button").style.display = "none";


            // we have to wait for all the chunks to come back from the server before we can download
            // right now we will use a default 4 seconds wait, but this should change
            window.setTimeout(() => setDownloadDisabled(false), 4000);
            setDownloadVisible(true);

        }
        else {

            roomClient.startMetronome();
        }
    }


    const renderer = ({ seconds, completed }) => {
        if (completed) {
            props.setRecord(true);
            props.setAnimationVisible(true);
            recorder.startRecording();
            setStartCount(false);
            // Render a complete state
            return "";
        } else {
            // Render a countdown
            return <span>{seconds}</span>;
        }
    };

    const toggleRecording = () => {

        if (!startCount & !props.record) {
            setStartCount(true);
        }
        else if (!startCount & props.record) {
            
            recorder.stopRecording();

        }

    }

    roomClient.onMetronomeStart = toggleRecording;
    roomClient.onMetronomeStop = toggleRecording;

    var buttonMessage = startCount ?
        <Countdown
            date={Date.now() + 3000}
            renderer={renderer}
        />
        :
        props.record ?
            "Stop Recording"
            :
            "Start Recording"

    return (
        <div>
            <button id="fancy-button" onClick={makeToggleRequest} type="button" className={startCount ? "button--yellow" : props.record ? "button--red" : "button--green"}>{buttonMessage}</button>
            {downloadButton}
        </div>
    )
}


export default FancyButton;