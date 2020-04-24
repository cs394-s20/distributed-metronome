import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import FancyButton from './FancyButton';
import metronome from '../../animation.gif';

var recording = false;

function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  let animation = <img className="animation" src={metronome} alt="Recording..." />
  return (
    <div>
      <div className="flexRow justifyContentCenter">
        {animationVisible ? animation : ""}
      </div>
      <div className="flexRow justifyContentCenter">
        <FancyButton setRecord={setRecord} record={record} appClient={props.appClient} setAnimationVisible={setAnimationVisible}/>
      </div>
    </div>
  )
}
export default StartRecording;