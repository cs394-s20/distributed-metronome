import React, { useState } from 'react';
import '../../styles/styles.scss';

function Home(props){
    return (
        <React.Fragment>
            <h2>The easy way to record and stream multipart pieces without any lag.</h2>
            <button class="button--green">Start Session</button>
            <button class="button--blue" onClick={() => props.setPage('joinSession')}>Join Session</button>
        </React.Fragment>
    )
}
export default Home;
// class Home extends React.Component{
//     constructor(props){
//         super(props)
//     }

//     render = () =>{
//         return(
//             <React.Fragment>
//                 <h2>The easy way to record and stream multipart pieces without any lag.</h2>
//                 <button class="button--green">Start Session</button>
//                 <button class="button--blue" onClick={() => this.props.changeScreen('joinSession')}>Join Session</button>
//             </React.Fragment>
//         );
//     }
// }

// export default Home;