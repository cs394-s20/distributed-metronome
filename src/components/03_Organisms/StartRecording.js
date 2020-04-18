import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';


var recording = false; // for sending to backend

function StartRecording(props) {
  const [record, setRecord] = useState(false); // record = if it's recording or not

  // function called when you press "start recording" or "stop recording"
  const toggleRecording = () => {
    if (!record) {
      document.getElementById("button-1").disabled = true;
      var timeleft = 3;
      var downloadTimer = setInterval(function () {

        // when timer is up
        if (timeleft <= 0) {
          document.getElementById("button-1").disabled = false;
          recording = true;
          clearInterval(downloadTimer);
          setRecord(!record)
          document.getElementById("countdown").innerHTML = "";
        }
        // when timer is still going
        else {
          document.getElementById("countdown").innerHTML = timeleft;
        }
        timeleft -= 1;
      }, 1000);
    }
    else {
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

  // function that's called when you stop recording
  const onStop = (recordedBlob) => {
    // console.log('recordedBlob is: ', recordedBlob);
    // console.log("Blah: ", recordedBlob["blobURL"]);

    const name = prompt('Please enter a name for the recording!'); // prompts you to name the file
    const link = document.createElement('a');
    link.href = recordedBlob["blobURL"];
    link.download = name;
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
      <div id="countdown"></div>
    </div>
  )
}
export default StartRecording;