import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
//import { useHistory } from "react-router-dom";
import person from '../../../assets/images/profile.svg';

const PlaylistCard = (props) => {
  const [playing, setPlaying] = useState(false);

  //let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true);
  };
  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  const [audio, setAudio] = useState(null);
  useEffect(() => {
    if (props.playlistData.data.trackId) {
      setAudio(new Audio(props.playlistData.data.link));
    }
  }, []);

  useEffect(() => {
    if (audio) {
      if (!playing) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [playing, audio]);

  return (
    <div className="w-full">
      {/* <a href={`/playback/${props.videoData.username}/0`}> */}
      {props.playlistData.data.trackId ? (
        <div className={`cursor-pointer`}>
          <a href={`/track/${props.playlistData.username}/${props.playlistData.index}`}>
            <img
              src={props.playlistData.data.trackImage}
              alt=""
              className="w-full h-52"
              onMouseMove={handleMouseMove}
              onMouseLeave={hanldeMouseLeave}
            />
          </a>
        </div>
      ) : (
        <div className={`cursor-pointer`}>
          <a href={`/playback/${props.playlistData.username}/${props.playlistData.index}`}>
            <ReactPlayer
              width="100%"
              height="auto"
              playing={playing}
              muted={false}
              volume={0.5}
              url={props.playlistData.data.link}
              controls={false}
              onMouseMove={handleMouseMove}
              onMouseLeave={hanldeMouseLeave}
            />
          </a>
        </div>
      )}

      {/* </a> */}
      <div className="col-start-1 row-start-3 pb-2 pt-2">
        <p className="flex   text-black text-sm font-medium">
          <img src={person} alt="" className="w-10 h-10 rounded-full mr-2 bg-gray-100" />
          <div>
            <span className="text-sm font-semibold dark:text-gray-200">
              {props.playlistData.data.trackId
                ? props.playlistData.data.trackName.slice(0, 45) + '...'
                : props.playlistData.data.videoName.slice(0, 45) + '...'}
            </span>
            <br />
            <span className="text-s text-gray-500  ">{props.playlistData.username}</span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
