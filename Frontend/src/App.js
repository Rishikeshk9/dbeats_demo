import {  Suspense, lazy } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import LandingPage from './components/LandingPage/LandingPage';

import './App.css';

//lazy loading
const Home = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Home/Home")), 1000);
  });
});

const  PublicRoom = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Room/PublicRoomPage")), 1000);
  });
});

const  PlaybackRoom = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Room/PlaybackRoomPage")), 1000);
  });
});

const  UserRoom = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Room/UserRoomPage")), 1000);
  });
});

const  Profile = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Profile/Profile")), 1000);
  });
});

const  PublicProfile = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Profile/PublicProfile")), 1000);
  });
});


const  Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./components/Login/Login")), 1000);
  });
});


const App = () => {

  return (
    <Router>
        <Suspense fallback={<Loader/>}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/loader" component={Loader} />
            <Route exact path="/home" component={Home} /> 
            <Route exact path="/streamer/:roomID" component={UserRoom} />    
            <Route exact path="/public/:username" component={PublicRoom} />            
            <Route exact path="/playback/:username/:video_id" component={PlaybackRoom} />            
            <Route exact path="/profile/:username" component={Profile} />            
            <Route exact path="/public_profile/:username" component={PublicProfile} />            
            <Route exact path="/login" component={Login} />            
            {/* TODO: <Route exact path="*" component={PageNotFound} /> */}
          </Switch>
        </Suspense>
    </Router>
  );
}

export default App;

