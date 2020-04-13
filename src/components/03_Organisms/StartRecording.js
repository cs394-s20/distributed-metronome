import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';

const roomClient = new RoomClient('ws://localhost:3002');
// console.log("Starting RoomClient")

// const handleSuccess = function (stream) {
//   const context = new AudioContext();
//   const source = context.createMediaStreamSource(stream);
//   const processor = context.createScriptProcessor(1024, 1, 1);

//   source.connect(processor);
//   processor.connect(context.destination);

//   processor.onaudioprocess = function (e) {
//     // Do something with the data, e.g. convert it to WAV
//     console.log(e.inputBuffer.getChannelData(0));
//   };
// };

// navigator.mediaDevices.getUserMedia({ audio: true, video: false })
//   .then(handleSuccess);

var recording = false;

function StartRecording(props) {
  const [record, setRecord] = useState(false);

  const handleSuccess = function (stream) {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      // Do something with the data, e.g. convert it to WAV
      if (recording) {
        // console.log(e.inputBuffer.getChannelData(0));
        // console.log("hello");
        console.log(e);
        roomClient.sendVideo(e.inputBuffer.getChannelData(0));
      }
    };
  };
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);


  const toggleRecording = () => {
    if(record) {
      roomClient.stopMetronome();
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