import React, { useState } from 'react';

function ClickTrack(props) {
    const recorder = props.appClient.recorder;
    const [playback, setPlayBack] = useState(false);
    var btnMessage = playback ? "Change Clicktrack" : "Upload Clicktrack";

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
        <button type="button" onClick={makeToggleRequest} className="button--yellow-long">{btnMessage}</button>
    );

}

export default ClickTrack;