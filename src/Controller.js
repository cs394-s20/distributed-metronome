import React, { useState } from 'react';
import Header from './components/02_Molecules/Header/Header';
import Footer from './components/02_Molecules/Footer/Footer';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';
import StartRecording from './components/03_Organisms/StartRecording';
import Confirmation from './components/03_Organisms/Confirmation';

function Controller(props){
    const [page, setPage] = useState('home');
    const [mode, setMode] = useState('dark');

    let currPage;
    let leaveButton;
    let roomCode;
    let roomCount;

    if (page === 'home'){
        leaveButton = false;
        roomCode = false;
        roomCount = false;
        currPage = <Home setPage={setPage} appClient={props.appClient} mode={mode}/>
    }

    if (page === 'joinSession'){
        leaveButton = false;
        roomCode = false;
        roomCount = false;
        currPage = <JoinSession setPage={setPage} appClient={props.appClient} mode={mode}/>
    }

    if (page === 'startRecording'){
        leaveButton = true;
        roomCode = true;
        roomCount = true;
        currPage = <StartRecording setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'confirmation'){
        leaveButton = true;
        roomCode = true;
        roomCount = true;
        currPage = <Confirmation setPage={setPage} appClient={props.appClient} mode={mode}/>
    }

    return(
        <React.Fragment>
            <Header setPage={setPage} appClient={props.appClient} leaveButton={leaveButton} roomCode={roomCode} roomCount={roomCount} mode={mode}/>
            <div className="content" style = { { backgroundImage : "url(" + require("./bg.png") + ")" } }>
                {currPage}
                <Footer setMode={setMode}/>
            </div>
            
        </React.Fragment>
    )
}

export default Controller;