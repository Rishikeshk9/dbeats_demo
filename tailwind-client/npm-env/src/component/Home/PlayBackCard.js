import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
//import { useHistory } from "react-router-dom";
import person from '../../assets/images/profile.svg';
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
  }, []);

  return (
    <div className="w-full h-auto  ">
      <div className={`cursor-pointer`}>
        <a href={`/playback/${props.playbackUserData.username}/0`}>
          <ReactPlayer
            width="100%"
            height="auto"
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
          <img src={person} alt="" className="w-10 h-10 rounded-full mr-2 bg-gray-100" />
          <div className="w-full">
            <span className="text-sm font-semibold dark:text-gray-200">
              {props.playbackUserData.videos[index].videoName.slice(0, 45) + '...'}
            </span>
            <br />
            <div className="flex justify-between w-full">
              <div className="text-s text-gray-500  ">{props.playbackUserData.name}</div>
              <div className="text-s text-gray-500 pr-2 ">{time}</div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlayBackCard;
