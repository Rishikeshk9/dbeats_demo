import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import Room from './components/Room/Room';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
