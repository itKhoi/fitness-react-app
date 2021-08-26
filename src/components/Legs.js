import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./Legs.css"


export default function Legs() {

    let history = useHistory();
    const [legs, setLegs] = useState([]);
    const[rerender, setRender] = useState(false);

    useEffect( () => {
        async function updateLegs(){
            let response = await fetch('/leg').then(response =>
                response.json().then(data =>
                    {setLegs(data.legs);
                })
            )
        }
        updateLegs();
        console.log("rerendered");
        updateLegs();
    }, [rerender])

    const delLegs = async ( { legs } ) => {
        await fetch('/del_leg', {
            method:'POST',
            body: JSON.stringify({
                "id": legs.id
            })
        }).then(response => response.json()).then(
            setRender(!rerender),
            data=>{
                console.log(data);
            }
        )
    }

    const backHome = () => {
        history.push("/");
    }

    const handleClick = () => {
        console.log("imma eat ur booty");
    }

    return (
        <div className="legs">
            <Router>
                
            </Router>
        </div>
    )
}
