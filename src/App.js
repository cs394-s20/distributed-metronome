import React from 'react';
import './styles/styles.scss';
import Controller from './Controller';
import Header from './components/02_Molecules/Header';
import StartRecording from './components/03_Organisms/StartRecording';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header/>
      </div>
      <div className="content">
        <Controller/>
      </div>
    </div>
  );
}

export default App;
