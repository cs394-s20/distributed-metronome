import React, { useState } from 'react';
import '../../styles/styles.scss';
import Countdown from 'react-countdown-now';
import TogglePlayBack from './TogglePlayBack';
import ToggleTwitch from './ToggleTwitch';




function FancyButton(props) {
    const [startCount, setStartCount] = useState(false);
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [downloadVisible, setDownloadVisible] = useState(false);
    const [clickTrack, setClickTrack] = useState(null);
    let downloadButton = downloadVisible ? <button onClick={() => recorder.saveRecording()} disabled={downloadDisabled} className={downloadDisabled ? null : "button--purple"} >{downloadDisabled ? 'Please wait...' : 'Download!'}</button> : "";

    const roomClient = props.appClient.roomClient;
    const recorder = props.appClient.recorder;
    var file = props.appClient.file;
    const makeToggleRequest = () => {
        if (props.record) {
            props.setAnimationVisible(false);
            roomClient.stopMetronome();
            if (clickTrack) {
                clickTrack.pause();
            }
            document.getElementById("fancy-button").style.display = "none";
            document.getElementById("toggle-playback").style.display = "none";
            document.getElementById("click-track").style.display = "none";
            document.getElementById("toggle-twitch").style.display = "none";
            // we have to wait for all the chunks to come back from the server before we can download
            // right now we will use a default 4 seconds wait, but this should change
            window.setTimeout(() => setDownloadDisabled(false), 4000);
            setDownloadVisible(true);

        }
        else {

            roomClient.startMetronome();
            if (clickTrack) {
                clickTrack.play();
            }
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

    const uploadFile = event => {

        setClickTrack(new Audio(event.target.files[0]))

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
            <div id="toggle-playback">
                <TogglePlayBack appClient={props.appClient}></TogglePlayBack>
            </div>
            <div id="click-track" style= {{backgroundColor: 'rgb(255, 213, 74)', 
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
            <div id="toggle-twitch">
                <ToggleTwitch appClient={props.appClient} record = {props.record}></ToggleTwitch>
            </div>
            <label for="file">Upload Clicktrack:</label>
            <input type="file" accept="audio/*" onChange={uploadFile} style={{width:'50%'}}/>
            

        </div>
        </div>
    )
}


export default FancyButton;