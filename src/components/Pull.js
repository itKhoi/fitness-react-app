import React, { useEffect, useState } from 'react'
import "./Pull.css"
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

export default function Pull() {
    let history = useHistory();
    const [pull, setPull] = useState([]);
    const[rerender, setRender] = useState(false);

    useEffect( ()=> {
        async function updatePull(){
            let response = await fetch('/pull').then(response => 
                response.json().then(data => 
                    {setPull(data.pull);
                })
            )
        }
        updatePull();
        console.log("rerendered");
        updatePull();
    },[rerender])

    const delPull = async ( { pull } ) =>{
        await fetch('/del_pull',{
            method:'POST',
            body: JSON.stringify({
                "id":pull.id
            })
        }).then(response => response.json()).then(
            setRender(!rerender),
            data => {
                console.log(data);
            }
        )
    }

    const backHome = () => {
        history.push("/");
    }

    const handleClick = () => {
        history.push("/pull_form")
    }

    return (
        <div className="pull">
            <Router>
                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Reps</th>
                            <th>Sets</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pull.map(pull => {
                            return(
                                <tr>
                                    <th>{ pull.name }</th>
                                    <th>{ pull.reps }</th>
                                    <th>{  pull.sets }</th>
                                    <th className="note">{ pull.notes }</th>
                                    <th><ReactBootStrap.Button variant="outline-danger" onClick={ () => delPull({pull})}>X</ReactBootStrap.Button> </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </ReactBootStrap.Table>
                <div className="buttonContainer">
                    <button className="homeButton" onClick={backHome}>Home</button>
                    <button className="addPull" onClick={handleClick}>Add Pull</button>
                </div>
            </Router>
        </div>
    )
}
