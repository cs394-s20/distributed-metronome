import React from 'react';
// import { ReactMic } from 'react-mic';
// import '../../styles/styles.scss';

// class StartRecording extends React.Component{
//     constructor(props) {
//             super(props);
//             this.state = {
//               record: false
//             }
         
//           }
         

//     render = () =>{
//         return(
//             <div>
//            <ReactMic
//           record={this.state.record}
//           className="sound-wave"
//           onStop={this.onStop}
//           onData={this.onData}
//           strokeColor="#000000"
//           backgroundColor="white" />
//             <button class="button--green">Start Recording</button>
//             </div>

//         );
//     }
// }
// export default StartRecording;
import { ReactMic } from 'react-mic';
 
export default class Example extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              record: false
            }
         
          }
 
  onData() {
    console.log('This function does not return an object, but is called at a time interval of 10ms');
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
 
  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" 
          mimeType="audio/mp3" />
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
      </div>
    );
  }
}