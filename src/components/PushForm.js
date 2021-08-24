import React, { useState } from 'react'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./PushForm.css"

export const PushForm = () => {
    
    let history = useHistory();
    const[status, setStatus] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        console.log(e.target.reps.value);
        console.log(e.target.description.value);
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

            /*await fetch('/add_push',{
                method:'POST',
                body: JSON.stringify({
                    "name": e.target.name.value,
                    "reps": e.target.reps.value,
                    "sets": e.target.sets.value,
                    "notes": e.target.description.value
                })
            }).then(response => response.json().then(
                data => {
                    console.log(data.status)
                    
                }
                
            ))*/
            let response = await fetch('/add_push',{
                method:'POST',
                body: JSON.stringify({
                    "name": e.target.name.value,
                    "reps": e.target.reps.value,
                    "sets": e.target.sets.value,
                    "notes": e.target.description.value
                })
            })

            
            if(response.status==403){
                console.log("you need a name");
                e.target.name.value="";
                document.getElementById('name').style.borderColor="#e8a9a9";
            }
            else{
                history.push("/push")
            }
            
        }
        
        //history.push("/");
    }
    const handleClick = () =>{
        console.log("going back");
        history.push("/push");
    }
    
    return (
        <div>
            <Router>
                <h1>Push Form</h1>
                 <div className = "form-container">
                    <form onSubmit = {handleSubmit}> 
                        <div className ="style1">
                            <p>Name</p>
                            <input type="text" id="name"></input>
                        </div>
                        <div className="style2">
                            <p>Reps</p>
                            <input type="number" id="reps" defaultValue='0'></input>
                        </div> 
                        <div className="style2">
                            <p>Sets</p>
                            <input type="number" id="sets" defaultValue='0'></input>
                        </div> 
                        <div className="style2">
                            <p>Description</p>
                            <textarea rows="4" id="description" columns={5}></textarea>
                        </div>
                        <ReactBootStrap.Button variant = "custom" onClick={handleClick}>
                            Back
                        </ReactBootStrap.Button> 
                        <ReactBootStrap.Button variant="primary" type = 'submit'>Submit</ReactBootStrap.Button>
                    </form>
                    

                </div>
                
               </Router>           
         </div>
    )
    
}
