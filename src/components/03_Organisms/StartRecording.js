import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
// import Countdown from 'react-countdown-now';
import FancyButton from './FancyButton';

var recording = false;

function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);

  var buttonMessage = record ? "Stop Recording" : "Start Recording"
  return (
    <div>
      <h3 style={{color: "red"}}>Room Code: {roomClient.roomCode}</h3>
      <div className="flexRow justifyContentCenter">
        <ReactMic
          record={record}
          className="sound-wave"
          
          strokeColor="white"
          backgroundColor="black"
          mimeType="audio/mp3"
          id='react-mic' />
      </div>
      <div className="flexRow justifyContentCenter">
        {/* <button onClick={toggleRecording} type="button" className={startCount ? "button--yellow" : record ? "button--red" : "button--green"}>{buttonMessage}</button> */}
        <FancyButton setRecord={setRecord} record={record} appClient={props.appClient}></FancyButton>
      </div>
    </div>
  )
}
export default StartRecording;