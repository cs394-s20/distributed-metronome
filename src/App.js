import React from 'react';
import './styles/styles.scss';
import Controller from './Controller';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAkM5OZLLeFTLg2t_ySgRxJtBqp7gZFjhc",
  authDomain: "metronome-877ec.firebaseapp.com",
  databaseURL: "https://metronome-877ec.firebaseio.com",
  projectId: "metronome-877ec",
  storageBucket: "metronome-877ec.appspot.com",
  messagingSenderId: "826401001178",
  appId: "1:826401001178:web:7ecf7382ef0d6ed64c9fe3",
  measurementId: "G-2CR5NDRTLY"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Controller />
    </div>
  );
}

export default App;
