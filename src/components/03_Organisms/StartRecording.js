import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import FancyButton from './FancyButton';

var recording = false;

function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);

  return (
    <div>
      <div className="flexRow justifyContentCenter">
        {/* <ReactMic
          record={record}
          className="sound-wave"
          
          strokeColor="white"
          backgroundColor="black"
          mimeType="audio/mp3"
          id='react-mic' /> */}
      </div>
      <div className="flexRow justifyContentCenter">
        <FancyButton setRecord={setRecord} record={record} appClient={props.appClient}></FancyButton>
      </div>
    </div>
  )
}
export default StartRecording;