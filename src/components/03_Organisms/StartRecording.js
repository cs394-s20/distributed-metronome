import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
// import RoomClient from '../../shared/RoomClient';

// const roomClient = new RoomClient('ws://18.217.104.101:3000');

var recording = false;

function StartRecording(props) {
  const [record, setRecord] = useState(false);


  const toggleRecording = () => {
    if (!record){
      document.getElementById("button-1").disabled = true;
      if (document.body.style.backgroundColor === 'white')
        document.getElementById("progressBar").style.backgroundColor = 'red';
      else if (document.body.style.backgroundColor === 'black')
      document.getElementById("progressBar").style.backgroundColor = 'white';
      var timeleft = 3;
      var progressBarUnit = 33.3;
      var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
          document.getElementById("button-1").disabled = false;
          recording = true;
          clearInterval(downloadTimer);
          document.getElementById("progressBar").style.display = "none";
          setRecord(!record)
          document.getElementById("countdown").innerHTML = "";
        } else {
          var progressBar = document.getElementById("progressBar");
          document.getElementById("countdown").innerHTML = timeleft;
          progressBar.style.width = (4 - timeleft) * progressBarUnit + '%';
        }
        timeleft -= 1;
      }, 1000);
    }
    else{
      recording = false;
      setRecord(!record)
    }

  }


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
        // console.log(e);


        // roomClient.sendVideo(e.inputBuffer.getChannelData(0));
      }
    };
  };
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);

  const onData = (recordedBlob) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob) => {
    // console.log('recordedBlob is: ', recordedBlob);
    // console.log("Blah: ", recordedBlob["blobURL"]);

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
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="white"
            backgroundColor="black"
            mimeType="audio/mp3" />
        </div>
        <div className="flexRow justifyContentCenter">
          <button onClick={toggleRecording} type="button" id="button-1" className={record ? "button--red" : "button--green"}>{buttonMessage}</button>
        </div>

        <div id="progressBar" style = { { width: "0%"} }></div>
        <div id="countdown" style = { { fontSize: '80px', fontWeight: 'bold'} }></div>
      </div>
  )
}
export default StartRecording;