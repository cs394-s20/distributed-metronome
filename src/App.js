import React from 'react';
import './styles/styles.scss';
import Controller from './Controller';
import AppClient from './shared/AppClient';

function App() {
  const appClient = new AppClient();
  return (
    <div className="App">
      {/* <div className="header">
        <h1>Metronome</h1>
      </div>
      <div className="content">
        <Controller appClient={appClient}/>
      </div> */}
      <Controller appClient={appClient}/>
    </div>
  );
}

export default App;
