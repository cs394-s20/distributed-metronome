import React from 'react';
import '../../styles/styles.scss';

function Confirmation(props) {
    return (
        <React.Fragment>
            <h2>Audio file downloaded!</h2>
            <button className="button--green" onClick={() => props.setPage('startRecording')}>Record Another Track</button>
        </React.Fragment>
    )
}
export default Confirmation;