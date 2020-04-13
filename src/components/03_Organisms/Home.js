import React from 'react';
import '../../styles/styles.scss';

function Home(props){
    return (
        <React.Fragment>
            <h2>The easy way to record and stream multipart pieces without any lag.</h2>
            <button className="button--green" onClick={() => props.setPage('startRecording')}>Start Session</button>
            <button className="button--blue" onClick={() => props.setPage('joinSession')}>Join Session</button>
        </React.Fragment>
    )
}
export default Home;