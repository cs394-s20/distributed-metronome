import React from 'react';
import '../../styles/styles.scss';

function JoinSession(props) {
    return (
        <form>
            <div class="flexRow alignItemsCenter">
                <p>Session Code:</p>
                <input type="text" />
            </div>
            <div class="flexRow justifyContentCenter">
                <input type="button" value="Back" class="button--red button--small" onClick={() => props.setPage('home')} />
                <input type="submit" value="Enter" class="button--green button--small" onClick={() => props.setPage('startRecording')}/>
            </div>
        </form>
    )
}
export default JoinSession;