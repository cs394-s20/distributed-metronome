import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import Recorder from '../../shared/Recorder';


const recorder = new Recorder();
const roomClient = new RoomClient('ws://18.217.104.101:3000', false, false, false, function(e){recorder.playBuffer(e);});
recorder.processor = function(e){
  var channels = [];
  channels.push(e.inputBuffer.getChannelData(0));
  channels.push(e.inputBuffer.getChannelData(1));
  roomClient.sendVideo(channels);
}

var recording = false;
var buffer = [];

function StartRecording(props) {
  const [record, setRecord] = useState(false);

  const toggleRecording = () => {
    if(record) {
      roomClient.stopMetronome();
      console.log(buffer);
      recorder.stopRecording();
    }
    else{
      recorder.startRecording();
    }
    setRecord(!record);
    recording = !recording;
  }

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
        <button onClick={toggleRecording} type="button" className={record ? "button--red" : "button--green"}>{buttonMessage}</button>
      </div>
    </div>
  )
}
export default StartRecording;