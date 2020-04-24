import React, { useState } from 'react';

function TogglePlayBack(props) {
    const recorder = props.appClient.recorder;
    const [playback, setPlayBack] = useState(false);
    var btnMessage = playback ? "mute" : "unmute";

    const makeToggleRequest = () => {
        if (playback) {
            recorder.stopPlayBack();
            // props.setPlayBack(false);
            setPlayBack(false);
        }
        else {
            recorder.startPlayBack();
            // props.setPlayBack(true);
            setPlayBack(true);
        }
    }

    return (
    <button type="button" onClick={makeToggleRequest} className="button--green">{btnMessage}</button>
    );

}

export default TogglePlayBack;