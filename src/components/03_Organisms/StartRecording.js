import React from 'react';
import '../../styles/styles.scss';

class StartRecording extends React.Component{
    constructor(props){
        super(props)
    }

    render = () =>{
        return(
            <button class="button--green">Start Recording</button>
        );
    }
}

export default StartRecording;