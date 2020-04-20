// import React, { useState } from 'react';
// import Home from './components/03_Organisms/Home';
// import JoinSession from './components/03_Organisms/JoinSession';
// import StartRecording from './components/03_Organisms/StartRecording';
// import Confirmation from './components/03_Organisms/Confirmation';

// function Controller(props){
//     const [page, setPage] = useState('home')
    
//     if (page === 'home'){
//         return <Home setPage={setPage} appClient={props.appClient}/>
//     }

//     if (page === 'joinSession'){
//         return <JoinSession setPage={setPage} appClient={props.appClient}/>
//     }

//     if (page === 'startRecording'){
//         return <StartRecording setPage={setPage} appClient={props.appClient}/>
//     }

//     if (page === 'confirmation'){
//         return <Confirmation setPage={setPage} appClient={props.appClient}/>
//     }
// }

// export default Controller;

import React, { useState } from 'react';
import Header from './components/02_Molecules/Header';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';
import StartRecording from './components/03_Organisms/StartRecording';
import Confirmation from './components/03_Organisms/Confirmation';

function Controller(props){
    const [page, setPage] = useState('home')

    let currPage;
    let leaveButton;

    if (page === 'home'){
        leaveButton = false;
        currPage = <Home setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'joinSession'){
        leaveButton = false;
        currPage = <JoinSession setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'startRecording'){
        leaveButton = true;
        currPage = <StartRecording setPage={setPage} appClient={props.appClient}/>
    }

    if (page === 'confirmation'){
        leaveButton = true;
        currPage = <Confirmation setPage={setPage} appClient={props.appClient}/>
    }

    return(
        <React.Fragment>
            <Header setPage={setPage} leaveButton={leaveButton}/>
            <div className="content" style = { { backgroundImage : "url(" + require("./bg.png") + ")" } }>
                {currPage}
            </div>
        </React.Fragment>
    )
}

export default Controller;