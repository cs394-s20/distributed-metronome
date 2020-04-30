import React, { useState } from 'react';
import '../../../styles/styles.scss';

function Recordings_list(props) {

   function changeColor1(props) {
       if (document.getElementById("1").style.backgroundColor == 'lightgray') {
           document.getElementById("1").style.backgroundColor = 'lightgreen' 
       }
       else {
           document.getElementById("1").style.backgroundColor = 'lightgray'
       }
   }
   function changeColor2(props) {
        if (document.getElementById("2").style.backgroundColor == 'lightgray') {
            document.getElementById("2").style.backgroundColor = 'lightgreen' 
        }
        else {
            document.getElementById("2").style.backgroundColor = 'lightgray'
        }
    }
    function changeColor3(props) {
        if (document.getElementById("3").style.backgroundColor == 'lightgray') {
            document.getElementById("3").style.backgroundColor = 'lightgreen' 
        }
        else {
            document.getElementById("3").style.backgroundColor = 'lightgray'
        }
    }
    function changeColor4(props) {
        if (document.getElementById("4").style.backgroundColor == 'lightgray') {
            document.getElementById("4").style.backgroundColor = 'lightgreen' 
        }
        else {
            document.getElementById("4").style.backgroundColor = 'lightgray'
        }
    }



    return (
        <div className="recordings-list">
            <h3>Uploaded Files</h3>
            <h5 id="1" onClick={changeColor1}>clicktrack1.mp3</h5>
            <h5 id="2" onClick={changeColor2}>clicktrack2.mp3</h5>
            <h5 id="3" onClick={changeColor3}>background-instrument-1.wav</h5>
            <h5 id="4" onClick={changeColor4}>background-instrument-2.wav</h5>
            <h4 onClick={() => {}}>+</h4>
        </div>
    )
}

export default Recordings_list;