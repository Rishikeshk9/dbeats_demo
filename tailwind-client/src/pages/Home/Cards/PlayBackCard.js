import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
//import { useHistory } from "react-router-dom";
import person from '../../../assets/images/profile.svg';
import moment from 'moment';
moment().format();

const PlayBackCard = (props) => {
  const [playing, setPlaying] = useState(false);

  //let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  const [time, setTime] = useState(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let ind = props.playbackUserData.videos.length - 1;
    setIndex(ind);
    let videotime = props.playbackUserData.videos[ind].time;
    const timestamp = new Date(videotime * 1000); // This would be the timestamp you want to format
    setTime(moment(timestamp).fromNow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${props.darkMode && 'dark'} w-full h-auto`}>
      <div className={`cursor-pointer w-full 2xl:h-52 lg:h-32 h-44 dark:bg-dbeats-dark-primary`}>
        <a href={`/playback/${props.playbackUserData.username}/${index}`}>
          <ReactPlayer
            width="100%"
            height="100%"
            playing={playing}
            muted={false}
            volume={0.5}
            url={props.playbackUserData.videos[index].link}
            controls={false}
            onMouseMove={handleMouseMove}
            onMouseLeave={hanldeMouseLeave}
          />
        </a>
      </div>
      <div className="col-start-1 row-start-3 pb-2 pt-2">
        <p className="flex   text-black text-sm font-medium">
          <img
            src={person}
            alt=""
            className="2xl:w-10 2xl:h-10 w-10 h-10 lg:w-7 lg:h-7 rounded-full mr-2 bg-gray-100 self-center"
          />
          <div className="w-full">
            <span className="2xl:text-sm lg:text-xs text-sm font-semibold dark:text-gray-200">
              {props.playbackUserData.videos[index].videoName.slice(0, 45) + '...'}
            </span>
            <br />
            <div className="flex justify-between w-full">
              <div className="2xl:text-sm lg:text-xs text-sm text-gray-500  ">
                {props.playbackUserData.name}
              </div>
              <div className="2xl:text-sm lg:text-xs text-sm text-gray-500 pr-2 ">{time}</div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlayBackCard;
