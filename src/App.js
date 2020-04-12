import React from 'react';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession'
import Controller from './Controller';
import './styles/styles.scss';
import StartRecording from './components/03_Organisms/StartRecording';

function App() {
  return (
    <div className="App">
      <div class="header">
        <h1>Metronome</h1>
      </div>
      <div class="content">
        {/* <Controller /> */}
        <StartRecording/>
      </div>
    </div>
  );
}

export default App;
