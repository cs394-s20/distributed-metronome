import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import FancyButton from './FancyButton';
import TogglePlayBack from './TogglePlayBack';

var recording = false;

function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);
  // const [playback, setPlayBack] = useState(true);

  return (
    <div>
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
        <FancyButton setRecord={setRecord} record={record} appClient={props.appClient}></FancyButton>
        <TogglePlayBack setRecord={setRecord} record={record} appClient={props.appClient}></TogglePlayBack>
      </div>
    </div>
  )
}
export default StartRecording;