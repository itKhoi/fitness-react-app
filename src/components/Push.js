import React, { useEffect, useState } from 'react'
import { List, Header } from 'semantic-ui-react'
import "./Push.css"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import PushForm from "./PushForm.js"


/** Goal tomorrow is to try to move all push related stuff into this file since i think that will help render component better */
export const Push = () => {
    
    let history = useHistory();
    //testing putting everything inside push vs useEffect in App.js
    const [push, setPush] = useState([])
    const [rerender, setRender] = useState(false)
    useEffect(()=>{
        async function updatePush(){
            let response = await fetch('/push').then(response =>
                response.json().then(data =>
                    {setPush(data.push);
                })
            );
            
        }

        updatePush();
        console.log("rerendered");
        updatePush();
    },[rerender])

    console.log(push);

    const handleClick = () =>{
        history.push("/push_form")
    }

    const backHome = () =>{
        history.push("/");
    }

    const delPush = async ( { push } ) => {
        await fetch('/del_push', {
            method: 'POST',
            body: JSON.stringify({
                "id":push.id
            })
        }).then(response => response.json()).then(
            setRender(!rerender),
            data => {
                console.log(data)
            }
        ).then(setRender(!rerender))
         
    }
    
    

    return (
        
        <div className="push">
        
           <Router>
                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Repts</th>
                            <th>Sets</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {push.map(push =>{
                            return(
                                <tr>
                                    <th>{ push.name }</th>
                                    <th> { push.reps } </th>
                                    <th>{ push.sets }</th>
                                    <th className="note">{ push.notes }</th>
                                    <th> <ReactBootStrap.Button variant="outline-danger" onClick={ () => delPush({push})}>X</ReactBootStrap.Button> </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </ReactBootStrap.Table>
                <div className="buttonContainer">
                    <button className="homeButton" onClick={backHome}>Home</button>
                    <button className="addPush" onClick={handleClick}>Add Push</button>
                </div>

            </Router>
        </div>
       
    )
}

