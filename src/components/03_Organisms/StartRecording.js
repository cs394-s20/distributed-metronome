import React, { useState, useEffect } from 'react';
import '../../styles/styles.scss';
import RoomClient from '../../shared/RoomClient';
import FancyButton from './FancyButton';
import metronome from '../../animations/animation.gif';
import musicnote from '../../animations/animation2.gif';


function StartRecording(props) {
  const roomClient = props.appClient.roomClient;
  const recorder = props.appClient.recorder;

  const [record, setRecord] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [whichAnimation, setWhichAnimation] = useState('metronome');


  const toggleAnimation = () => {
    if (whichAnimation == 'metronome') {
      setWhichAnimation('musicnote');
    }
    else {
      setWhichAnimation('metronome');
    }
  };

  useEffect(() => {
    alert('Wear headphones to prevent any playback from being recorded.');
  }, []);

  let animation = <img className="animation" src={(whichAnimation == 'metronome') ? metronome : musicnote} alt="Recording..." onClick={() => toggleAnimation()} />
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