import React, { useState } from 'react';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';
import StartRecording from './components/03_Organisms/StartRecording';
import Confirmation from './components/03_Organisms/Confirmation';

function Controller(props){
    const [page, setPage] = useState('home')
    
    if (page === 'home'){
        return <Home setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'joinSession'){
        return <JoinSession setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'startRecording'){
        return <StartRecording setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'confirmation'){
        return <Confirmation setPage={setPage} appClient={props.appClient}/>
    }
}

export default Controller;