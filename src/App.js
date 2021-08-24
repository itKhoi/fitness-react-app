import React, { useEffect, useState } from 'react';
import "./App.css"
import { Push } from './components/Push';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { PushForm } from './components/PushForm';


function App() {
  /*const [push, setPush] = useState([])
  
  useEffect(()=>{
    fetch('/push').then(response => 
      response.json().then(data =>
        {setPush(data.push);
      })
    );
  },[])
  
  console.log(push);*/
  
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/push">
            <Push/>
          </Route>
          <Route path="/push_form">
            <PushForm/>
          </Route>
        </Switch>
      </Router>
        
    </div>
  )
}

export default App;
