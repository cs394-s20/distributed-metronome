import React, { useState } from 'react';

import Countdown from 'react-countdown-now';

function FancyButton(props) {
    const roomClient = props.appClient.roomClient;
    const recorder = props.appClient.recorder;
    const makeToggleRequest = () => {
        if(props.record){
            
            roomClient.stopMetronome();
        }
        else {
            
            roomClient.startMetronome();
        }
    }
    const [startCount, setStartCount] = useState(false);


    const renderer = ({ seconds, completed }) => {
        if (completed) {
            props.setRecord(true);
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

        if (!startCount & !props.record){
            setStartCount(true);
        }
        else if (!startCount & props.record) {
            recorder.stopRecording();
            recorder.saveRecording();
            props.setRecord(false);
            
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

        <button onClick={makeToggleRequest} type="button" className={startCount ? "button--yellow" : props.record ? "button--red" : "button--green"}>{buttonMessage}</button>

    )
}


export default FancyButton;