import "../node_modules/noty/lib/noty.css";
import axios from "axios";

import "../node_modules/noty/lib/themes/metroui.css";
import React, { useEffect } from "react";

import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./component/Loader/Loader";
import "./App.css";
import NavBar from "../src/component/Navbar/Navbar";
import Track from "./component/track.component";

//import Navbar from "./component/navbar.component";
//import BottomBar from "./component/bottom-player.component";

import NFTFeed from "./component/nft.component";

const VideoHome = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Home/Home")), 1000);
  });
});

const PublicRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Room/PublicRoomPage")), 1000);
  });
});

const Playback = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./component/Room/PlaybackRoomPage")),
      1000
    );
  });
});

const UserRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Room/UserRoomPage")), 1000);
  });
});

const Profile = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Profile/Profile")), 1000);
  });
});

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/Login/Login")), 1000);
  });
});

const UploadPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./component/switcher.component")), 1000);
  });
});

const App = () => {
  let user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/user/${user.username}`)
        .then((value) => {
          window.localStorage.setItem("user", JSON.stringify(value.data));
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <NavBar />

        <Switch>
          <div style={{ marginTop: "4.1rem" }}>
            <Route path="/nft" exact component={() => <NFTFeed />} />
            <Route path="/" exact component={() => <VideoHome />} />

            <Route path="/upload" exact component={() => <UploadPage />} />
            <Route path="/music" exact component={() => <Track />} />

            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/loader" component={Loader} />
            {/* <Route exact path="/home" component={VideoHome} />  */}
            <Route exact path="/streamer/:roomID" component={UserRoom} />
            <Route exact path="/live/:username" component={PublicRoom} />
            <Route
              exact
              path="/playback/:username/:video_id"
              component={Playback}
            />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/login" component={Login} />
            {/* TODO: <Route exact path="*" component={PageNotFound} /> */}
          </div>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
