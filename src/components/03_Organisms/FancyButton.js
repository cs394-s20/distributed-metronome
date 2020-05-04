import React, { useState } from 'react';
import '../../styles/styles.scss';
import Countdown from 'react-countdown-now';
import TogglePlayBack from './TogglePlayBack';
import ToggleTwitch from './ToggleTwitch';
import real_click_track from '../../music/click-track-9.mp3';




function FancyButton(props) {
    const [startCount, setStartCount] = useState(false);
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [downloadVisible, setDownloadVisible] = useState(false);
    const [clickTrack, setClickTrack] = useState([]);
    const [playBack, setPlayBack] = useState(null);
    let downloadButton = downloadVisible ? <button onClick={() => recorder.saveRecording()} disabled={downloadDisabled} className={downloadDisabled ? null : "button--purple"} >{downloadDisabled ? 'Please wait...' : 'Download!'}</button> : "";

    const roomClient = props.appClient.roomClient;
    const recorder = props.appClient.recorder;
    var file = props.appClient.file;
    recorder.onDownloadReady = () => {
        setDownloadDisabled(false);
        roomClient.clearData();
    }
    const makeToggleRequest = () => {
        if (props.record) {
            props.setAnimationVisible(false);
            recorder.lastChunk = recorder.chunks_recorded;
            roomClient.stopMetronome(recorder.lastChunk);
            
            document.getElementById("fancy-button").style.display = "none";
            document.getElementById("toggle-playback").style.display = "none";
            document.getElementById("click-track").style.display = "none";
            document.getElementById("toggle-twitch").style.display = "none";
            // we have to wait for all the chunks to come back from the server before we can download
            // right now we will use a default 4 seconds wait, but this should change
            //window.setTimeout(() => setDownloadDisabled(false), 4000);
            setDownloadVisible(true);
            props.appClient.isFinal = true;

        }
        else {
            props.appClient.isFinal = false;
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
            if (playBack) {
                playBack.play();
            }
        }
        else if (!startCount & props.record) {
            recorder.stopRecording();
            if (playBack) {
                playBack.pause();
            }

        }

    }

    const uploadFile = event => {

        setClickTrack(event.currentTarget.files)
        // console.log(event.target.files[0])
        // const aud = new Audio(event.target.files[0])
        // aud.load()
        // aud.play()
        // console.log(aud)

    }

    function changeColor(name) {
        if (document.getElementById(name)) {
             if (document.getElementById(name).style.backgroundColor == 'lightgray') {
                 document.getElementById(name).style.backgroundColor = 'lightgreen' 
             }
             else {
                 document.getElementById(name).style.backgroundColor = 'lightgray'
             }
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
            <div id="toggle-playback">
                <TogglePlayBack appClient={props.appClient}></TogglePlayBack>
            </div>
            <div id="toggle-twitch">
                <ToggleTwitch appClient={props.appClient} record = {props.record}></ToggleTwitch>
            </div>
            <div id="click-track" className="recordings-list" style= {{
            backgroundColor: 'rgb(255, 213, 74)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            width: "430px",
            fontSize: "16px",
            borderRadius: "10px",
            color: 'white',
            border: 'none',
            margin: '10px',
            flexDirection: 'column'
            

            }}>
            <div style= {{margin: '10px'}}>
            
            <label>Upload Clicktrack:</label>
            <input type="file" accept="audio/*" onChange={uploadFile} style={{width:'50%'}} multiple/>

            </div>
            <div style={{marginBottom: '10px'}}>
                {Array.from(clickTrack).map((track,index) => 
                <h5 id={index.toString()} key={index.toString()} style={{backgroundColor: 'lightgray'}} onClick={(e) => {
                    // console.log(document.getElementById(e.currentTarget.id).style)
                    
                         if (document.getElementById(e.currentTarget.id).style.backgroundColor == 'lightgray') {
                            document.getElementById(e.currentTarget.id).style.backgroundColor = 'lightgreen'
                            // setPlayBack(new Audio(clickTrack[e.currentTarget.id]))
                            // console.log(clickTrack[0])
                            // console.log(real_click_track)
                            setPlayBack(new Audio(real_click_track))
                            console.log("here");
                            // playBack.play()
                            // console.log(playBack)
                            
                            
                         }
                         else {
                            document.getElementById(e.currentTarget.id).style.backgroundColor = 'lightgray'
                            setPlayBack(null)
                            // playBack.pause()
                            // playBack.play()
                            console.log(playBack)
                        } }}>{track.name}</h5>
                )}
            </div>
        </div>
        </div>
    )
}


export default FancyButton;