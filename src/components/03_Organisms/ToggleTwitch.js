import React, { useState } from 'react';

function ToggleTwitch(props) {
    const roomClient = props.appClient.roomClient;
    const [twitch, setTwitch] = useState(false);
    var btnMessage = twitch ? "Streaming to Twitch" : "Not Streaming to Twitch";

    const makeToggleRequest = () => {
        if (twitch) {
            roomClient.stopTwitch();
            setTwitch(false);
        }
        else {
            roomClient.startTwitch();
            setTwitch(true);
        }
    }

    return (
        <button type="button" onClick={makeToggleRequest} className={twitch ?  "button--purple-long": "button--orange-long" } disabled={props.record ? "disabled" : ""}>{btnMessage}</button>
    );

}

export default ToggleTwitch;