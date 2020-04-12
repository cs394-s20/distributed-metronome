import React, { useState } from 'react';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';

function Controller(){
    const [page, setPage] = useState('home')
    
    if (page == 'home'){
        return <Home setPage={setPage}/>
    }

    if (page == 'joinSession'){
        return <JoinSession setPage={setPage}/>
    }
}

export default Controller;