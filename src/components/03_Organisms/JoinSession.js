import React from 'react';
import '../../styles/styles.scss';

function JoinSession(props) {
    return (
        <form>
            <div className="flexRow alignItemsCenter">
                <p>Session Code:</p>
                <input type="text" />
            </div>
            <div className="flexRow justifyContentCenter">
                <input type="button" value="Back" className="button--red button--small" onClick={() => props.setPage('home')} />
                <input type="submit" value="Enter" className="button--green button--small" onClick={() => props.setPage('startRecording')}/>
            </div>
        </form>
    )
}
export default JoinSession;