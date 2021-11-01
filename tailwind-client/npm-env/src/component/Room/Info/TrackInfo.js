import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
//import TrackCard from '../../Profile/TrackCard';

const TrackInfo = (props) => {
  console.log(props);
  const username = props.match.params.username;
  const track_id = props.match.params.track_id;
  //const user = JSON.parse(window.localStorage.getItem('user'));
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
  const [userData, setUserData] = useState(null);
  //const [playbackUrl, setPlaybackUrl] = useState('');

  //const [privateUser, setPrivate] = useState(true);

  //const [arrayData, setArrayData] = useState([]);
  const [play, setPlay] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [audio, setAudio] = useState(null);

  const get_User = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${username}`).then((value) => {
      setUserData(value.data);
      //setPlaybackUrl(`${value.data.tracks[track_id].link}`);
      setAudio(new Audio(value.data.tracks[track_id].link));
    });
  };

  useEffect(() => {
    get_User();
  }, []);

  useEffect(() => {
    if (audio) {
      if (!play) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [play, audio]);

  const handlePlay = () => {
    setPlay(!play);
  };

  return (
    <div className={`${darkMode && 'dark'}`}>
      <div className="w-full p-32 dark:text-white">
        {userData ? <h1>{userData.tracks[track_id].trackName}</h1> : <></>}
        <button
          onClick={handlePlay}
          className="  cursor-pointer mr-2 uppercase font-bold  bg-gradient-to-r from-green-400 to-blue-500   text-white block py-2 px-10   hover:scale-95 transform transition-all"
        >
          {`${play ? 'Pause' : 'Play'}`}
        </button>
      </div>
    </div>
  );
};

export default TrackInfo;
