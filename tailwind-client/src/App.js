import '../node_modules/noty/lib/noty.css';
import axios from 'axios';

import '../node_modules/noty/lib/themes/metroui.css';
import React, { useEffect } from 'react';

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loader from './component/Loader/Loader';
import './App.css';
import NavBar from '../src/component/Navbar/Navbar';
import Track from './component/track.component';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../src/actions/index';
import PinnedPanel from './component/Subscribe_Panel/Pinned_Panel';
import Ticket from './pages/Profile/ProfileSections/Ticket/Ticket';
import ChatRoom from './pages/Profile/ProfileSections/ChatRoom/ChatRoom';
import PageNotFound from './component/PageNotFound/PageNotFound';

//import Navbar from "./component/navbar.component";
//import BottomBar from "./component/bottom-player.component";

import NFTFeed from './component/nft.component';

const VideoHome = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/Home/Home')), 1000);
  });
});

const PublicRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import('./pages/VideoPages/Pages/LivePublicPage/PublicRoomPage')),
      1000,
    );
  });
});

const Playback = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/VideoPages/Pages/PlayBack/PlaybackRoomPage')), 1000);
  });
});

const UserRoom = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import('./pages/VideoPages/Pages/GoLive_UserPage/UserRoomPage')),
      1000,
    );
  });
});

const Profile = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/Profile/Profile')), 1000);
  });
});

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/Login/Login')), 1000);
  });
});

const UploadPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./component/switcher.component')), 1000);
  });
});

const SearchPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./component/Navbar/SearchResult')), 1000);
  });
});

const TrackPlayback = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/VideoPages/Pages/TrackPage/TrackInfo')), 1000);
  });
});

export default function App() {
  let user = JSON.parse(window.localStorage.getItem('user'));
  const darkMode = useSelector((state) => state.toggleDarkMode);
  let darkmode = JSON.parse(window.localStorage.getItem('darkmode'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${user.username}`).then((value) => {
        window.localStorage.setItem('user', JSON.stringify(value.data));
      });
    }
    if (darkmode === null) {
      window.localStorage.setItem('darkmode', darkMode);
      if (darkMode) {
        document.body.style.backgroundColor = '#101010';
      } else {
        document.body.style.backgroundColor = '#fff';
      }
    } else {
      dispatch(toggleDarkMode(darkmode));
      if (darkmode) {
        document.body.style.backgroundColor = '#101010';
      } else {
        document.body.style.backgroundColor = '#fff';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <div className={`${darkMode && 'dark'}  `}>
            <div className=" h-full  dark:bg-gradient-to-b dark:from-dbeats-dark-primary  dark:to-dbeats-dark-primary   ">
              <NavBar />
              <PinnedPanel userdata={user} />
              <div className=" ">
                <Switch>
                  <Route exact path="/nft" component={() => <NFTFeed />} />
                  <Route exact path="/" component={() => <VideoHome />} />

                  <Route exact path="/upload" component={() => <UploadPage />} />
                  <Route exact path="/music" component={() => <Track />} />

                  {/* <Route exact path="/" component={LandingPage} /> */}
                  <Route exact path="/loader" component={Loader} />
                  {/* <Route exact path="/home" component={VideoHome} />  */}
                  <Route exact path="/streamer/:roomID" component={UserRoom} />
                  <Route exact path="/live/:username" component={PublicRoom} />
                  <Route exact path="/playback/:username/:video_id" component={Playback} />
                  <Route exact path="/profile/:username/:tab?" component={Profile} />
                  <Route exact path="/signup" component={Login} />
                  <Route exact path="/search" component={() => <SearchPage />} />
                  <Route exact path="/track/:username/:track_id" component={TrackPlayback} />
                  <Route exact path="/chat/:username" component={ChatRoom} />
                  <Route exact path="/unlock" component={Ticket} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </Suspense>
      </Router>
    </>
  );
}
