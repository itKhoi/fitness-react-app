import React from 'react'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./Home.css"
import * as ReactBootStrap from "react-bootstrap";

export default function Home() {
    let history = useHistory();

    const handlePush=()=>{
        console.log("I have been clicked");
        history.push("/push");
    }

    const handlePull=()=>{
        console.log("I have been clicked");
        history.push("/pull")
    }

    const handleLeg=()=>{
        console.log("I have been clicked");
        history.push("/legs")
    }
    return (
        <div className="Home">
            <h1>
                Home Screen
            </h1>
            <div className="description">
                <p>
                Filler text that will help me put the description of stuff. 
                Filler text that will help me put the description of stuff. 
                Filler text that will help me put the description of stuff. 
                Filler text that will help me put the description of stuff. 
                Filler text that will help me put the description of stuff. 
                Filler text that will help me put the description of stuff.
                </p>
            </div>
            <div className="buttonContainer">
                <button className="pushButton" onClick={handlePush}>Push</button>
                <button className="pullButton" onClick={handlePull}>Pull</button>
                <button className="legButton" onClick={handleLeg}>Leg</button>
            </div>
            
            
        </div>
    )
}
