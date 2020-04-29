import React, { useState, useEffect } from 'react';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import FancyButton from './FancyButton';
// import metronome from '../../animations/animation.gif';
// import musicnote from '../../animations/animation2.gif';


function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [i, set_i] = useState(0);

  let images = ["metronome","musicnote","piano","record"]

  let animation = <img className="animation" src={require(`../../animations/${images[i]}.gif`)} alt="Recording..." onClick={() => (i==images.length-1)? set_i(0) : set_i(i+1)} />

  return (
    <div>
      <div className="flexRow justifyContentCenter">
        {animationVisible ? animation : ""}
      </div>
      <div className="flexColumn justifyContentCenter">
        <FancyButton setRecord={setRecord} record={record} appClient={props.appClient} setAnimationVisible={setAnimationVisible} page={props.page} />
      </div>
    </div>
  )
}
export default StartRecording;