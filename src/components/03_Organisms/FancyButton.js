import React, { useState } from 'react';

import Countdown from 'react-countdown-now';

function FancyButton(props) {

    const [startCount, setStartCount] = useState(false);


    const renderer = ({ seconds, completed }) => {
        if (completed) {
            props.setRecord(true);
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
          props.setRecord(false);
        }
        
    }

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

        <button onClick={toggleRecording} type="button" className={startCount ? "button--yellow" : props.record ? "button--red" : "button--green"}>{buttonMessage}</button>

    )
}


export default FancyButton;