import React, { useState } from 'react';

function ToggleTwitch(props) {
    const roomClient = props.appClient.roomClient;
    const [twitch, setTwitch] = useState(false);
    const hard_link = "https://www.twitch.tv/fendull"
    var btnMessage = twitch ? "Streaming to: " : "Not Streaming to Twitch";
    var twitchLink = twitch ? hard_link : '';

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
        <button type="button" onClick={makeToggleRequest} className={twitch ?  "button--purple-long": "button--orange-long" } disabled={twitchLink}>
            <span>{btnMessage}<a href={twitchLink} style={{display: "table-cell", color:"white"}} target="_blank">{twitchLink}</a></span>
        </button>
    );

}

export default ToggleTwitch;