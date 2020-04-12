import React from 'react';
import { ReactMic } from 'react-mic';
 
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      bloburl: ""
    }
    // bloburl = null
 
  }
 
  startRecording = () => {
    this.setState({
      record: true
    });
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    });
  }
 
  onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
    // console.log("Blah: ", recordedBlob["BlobURL"])
  }
 
  onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    console.log("Blah: ", recordedBlob["blobURL"]);
    this.setState({
      bloburl: recordedBlob["blobURL"]
    })

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
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <a download="recording.webm" href= {this.state.bloburl}>DOWNLOAD HERE</a>
      </div>
    );
  }
}