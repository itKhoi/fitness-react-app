import React, { useState } from 'react'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./PullForm.css"

export default function PullForm() {
    let history = useHistory();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!e.target.name.value){
            console.log("you need a name");
            e.target.name.value="";
            document.getElementById('name').style.borderColor="#e8a9a9";
        }else{
            document.getElementById('name').style.borderColor="black";
            console.log(JSON.stringify({
                "name": e.target.name.value,
                "reps": e.target.reps.value,
                "sets": e.target.sets.value,
                "notes": e.target.description.value
            }))

            let response = await fetch('/add_pull', {
                method: 'POST',
                body: JSON.stringify({
                    "name": e.target.name.value,
                    "reps": e.target.reps.value,
                    "sets": e.target.sets.value,
                    "notes": e.target.description.value
                })
            })

            if(response.status == 403){
                console.log("you need a name");
                e.target.name.value="";
                document.getElementById('name').style.borderColor="#e8a9a9";
            }else{
                history.push("/pull");
            }
        }
    }

    const handleClick = () =>{
        history.push("/pull");
    }

    return (
        <div>
            <Router>
                <h1>Pull Form</h1>
                <div className = "form-container">
                    <form onSubmit = {handleSubmit}>
                        <div className = "style1">
                            <p>Name</p>
                            <input type="text" id="name"></input>
                        </div>
                        <div className="style2">
                            <p>Reps</p>
                            <input type="number" id="reps" defaultValue='0' min='0'></input>
                        </div>
                        <div className="style2">
                            <p>Sets</p>
                            <input type="number" id="sets" defaultValue='0' min='0'></input>
                        </div>
                        <div className="style2">
                            <p>Description</p>
                            <textarea rows="5" id="description" columns= "7"></textarea>
                        </div>
                        <ReactBootStrap.Button variant = "primary" onClick={handleClick}>
                            Back
                        </ReactBootStrap.Button>
                        <ReactBootStrap.Button variant = "primary" type = 'submit'>
                            Submit
                        </ReactBootStrap.Button>
                    </form>
                </div>
            </Router>
        </div>
    )
}
