import React, { useState } from 'react';
import '../../../styles/styles.scss';

function Footer(props) {

    const handleChange = (event) => {
        if (event.target.value === "Dark") {
            props.setMode('dark')
            document.body.style.backgroundColor = "";
            document.getElementsByClassName("content")[0].style.boxShadow = "";
            localStorage.setItem("bgColor", "");
            localStorage.setItem("bgBoxShadow", "");
        }
        else if (event.target.value === "White") {
            props.setMode('white')
            document.body.style.backgroundColor = "white";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(255, 255, 255, 0.5)";
            localStorage.setItem("bgColor", "white");
            localStorage.setItem("bgBoxShadow", "inset 2000px 0 0 0 rgba(255, 255, 255, 0.5)");
        }
        else if (event.target.value === "Green") {
            document.body.style.backgroundColor = "green";
            document.getElementsByClassName("content")[0].style.boxShadow = "inset 2000px 0 0 0 rgba(0, 255, 0, 0.5)";
            localStorage.setItem("bgColor", "green");
            localStorage.setItem("bgBoxShadow", "inset 2000px 0 0 0 rgba(0, 255, 0, 0.5)");
        }
    }

    return (
        <div className="footer">
            <select className="select-bg" onChange = {handleChange}>
                <option value ="Dark">Dark</option>
                <option value ="White">White</option>
            </select>
        </div>
    )
}

export default Footer;