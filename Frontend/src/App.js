import {  Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import LandingPage from './components/LandingPage/LandingPage'

import './App.css';

//lazy loading
const Home = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Home/Home")), 1000);
  });
});

const  Room = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Room/Room")), 1000);
  });
});

function App() {
  return (
    <Router>
        <Suspense fallback={<Loader/>}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/loader" component={Loader} />
            <Route exact path="/home" component={Home} /> 
            <Route exact path="/room/:roomID" component={Room} />            
            {/* TODO: <Route exact path="*" component={PageNotFound} /> */}
          </Switch>
        </Suspense>
    </Router>
  );
}

export default App;

