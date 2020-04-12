import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';

function StartRecording(props) {
  const [record, setRecord] = useState(false);

  const toggleRecording = () => {
    setRecord(!record)
  }

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    console.log("Blah: ", recordedBlob["blobURL"]);

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
        <div class="flexRow justifyContentCenter">
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="white"
            backgroundColor="black"
            mimeType="audio/mp3" />
        </div>
        <div class="flexRow justifyContentCenter">
          <button onClick={toggleRecording} type="button" class={record ? "button--red" : "button--green"}>{buttonMessage}</button>
        </div>
      </div>
    )
}
export default StartRecording;