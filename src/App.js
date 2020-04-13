import React from 'react';
import './styles/styles.scss';
import Controller from './Controller';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Metronome</h1>
      </div>
      <div className="content">
        <Controller/>
      </div>
    </div>
  );
}

export default App;
