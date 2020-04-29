import React, { useState } from 'react';

function ToggleTwitch(props) {
    const roomClient = props.appClient.roomClient;
    const [twitch, setTwitch] = useState(false);
    var btnMessage = twitch ? "Link to Twitch" : "Not Link to Twitch";

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
        <button type="button" onClick={makeToggleRequest} className="button--orange-long" disabled={props.record ? "disabled" : ""}>{btnMessage}</button>
    );

}

export default ToggleTwitch;