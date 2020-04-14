import React, { useState } from 'react';
import Header from './components/02_Molecules/Header';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';
import StartRecording from './components/03_Organisms/StartRecording';
import Confirmation from './components/03_Organisms/Confirmation';

function Controller(){
    const [page, setPage] = useState('home')

    let currPage;
    let leaveButton;

    if (page === 'home'){
        leaveButton = false;
        currPage = <Home setPage={setPage}/>
    }

    if (page === 'joinSession'){
        leaveButton = false;
        currPage = <JoinSession setPage={setPage}/>
    }

    if (page === 'startRecording'){
        leaveButton = true;
        currPage = <StartRecording setPage={setPage}/>
    }

    if (page === 'confirmation'){
        leaveButton = true;
        currPage = <Confirmation setPage={setPage}/>
    }

    return(
        <React.Fragment>
            <Header setPage={setPage} leaveButton={leaveButton}/>
            <div className="content">
                {currPage}
            </div>
        </React.Fragment>
    )
}

export default Controller;