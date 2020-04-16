import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';


var recording = false;

function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);
  const makeToggleRequest = () => {
    if(record){
      roomClient.stopMetronome();
    }
    else {
      roomClient.startMetronome();
    }
  }
  const toggleRecording = () => {
    if(record) {
      
      recorder.stopRecording();
      recorder.saveRecording();
    }
    else{
      
      recorder.startRecording();
    }
    setRecord(!record);
    recording = !recording;
  }
  roomClient.onMetronomeStart = toggleRecording;
  roomClient.onMetronomeStop = toggleRecording;

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    console.log("Blah: ", recordedBlob["blobURL"]);

    roomClient.sendVideo(recordedBlob);

    const link = document.createElement('a');
    link.href = recordedBlob["blobURL"];
    link.download = "recording"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    props.setPage('confirmation')
  }

  var buttonMessage = record ? "Stop Recording" : "Start Recording"
  return (
    <div>
      <h3>Room Code: {roomClient.roomCode}</h3>
      <div className="flexRow justifyContentCenter">
        {/* <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="white"
          backgroundColor="black"
          mimeType="audio/mp3" /> */}
      </div>
      <div className="flexRow justifyContentCenter">
        <button onClick={makeToggleRequest} type="button" className={record ? "button--red" : "button--green"}>{buttonMessage}</button>
      </div>
    </div>
  )
}
export default StartRecording;