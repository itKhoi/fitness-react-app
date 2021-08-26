import React, { useEffect, useState } from 'react';
import "./App.css"
import { Push } from './components/Push';
import Pull from './components/Pull'
import PullForm from './components/PullForm';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { PushForm } from './components/PushForm';
import Legs from './components/Legs'


function App() {
 
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
          <Route path="/pull">
            <Pull/>
          </Route>
          <Route path="/pull_form">
            <PullForm/>
          </Route>
          <Route path="/legs">
            <Legs/>
          </Route>
        </Switch>
      </Router>
        
    </div>
  )
}

export default App;
