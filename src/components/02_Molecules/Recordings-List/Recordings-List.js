import React, { useState } from 'react';
import '../../../styles/styles.scss';

function Recordings_list(props) {

    const [clickTrack, setClickTrack] = useState([]);
    const uploadFile = event => {

        // const files =  event.currentTarget.files;
  
        // Array.from(files).forEach(file => console.log("Do something with " + file.name));

        setClickTrack(event.currentTarget.files)
    }
    

   function changeColor(name) {
       if (document.getElementById(name)) {
            if (document.getElementById(name).style.backgroundColor === 'lightgray') {
                document.getElementById(name).style.backgroundColor = 'lightgreen' 
            }
            else {
                document.getElementById(name).style.backgroundColor = 'lightgray'
            }
        }
   }



    return (
        <div id="click-track" className="recordings-list" style= {{
            backgroundColor: 'rgb(255, 213, 74)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            width: "430px",
            fontSize: "16px",
            borderRadius: "10px",
            color: 'white',
            border: 'none',
            margin: '10px',
            flexDirection: 'column'
            

            }}>
            <div style= {{margin: '10px'}}>
            
            <label>Upload Clicktrack:</label>
            <input type="file" accept="audio/*" onChange={uploadFile} style={{width:'50%'}} multiple/>

            </div>
            <div style={{marginBottom: '10px'}}>
                {Array.from(clickTrack).map((track,index) =>
                <h5 id={index.toString()} key={index.toString()} onClick={changeColor(index.toString())}>{track.name}</h5>)}
            </div>
        </div>
    )
}

export default Recordings_list;