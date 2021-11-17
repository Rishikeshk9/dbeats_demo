import React, { useState, useEffect } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
//import { red } from '@material-ui/core/colors';
import ReactPlayer from 'react-player';
import classes from '../Profile.module.css';
import moment from 'moment';
moment().format();

const CarouselCard = (props) => {
  //console.log(props);
  const [playing, setPlaying] = useState(false);

  const [time, setTime] = useState(null);

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  const convertTimestampToTime = () => {
    const timestamp = new Date(props.playbackUserData.time * 1000); // This would be the timestamp you want to format
    setTime(moment(timestamp).fromNow());
  };

  useEffect(() => {
    convertTimestampToTime();
  }, []);

  ////console.log(props.playbackUserData)

  return (
    <div className="w-full  flex lg:flex-row flex-col py-3 px-3 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2">
      <div className={`cursor-pointer lg:w-1/3 w-full  my-auto`}>
        <ReactPlayer
          onClick={() => {
            window.location.href = `/playback/${props.username}/${props.index}`;
          }}
          width="100%"
          height="auto"
          playing={playing}
          muted={false}
          volume={0.5}
          url={props.playbackUserData.link}
          controls={false}
          className={classes.cards_videos}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      <div className="col-start-1 row-start-3 py-2 px-5 w-full">
        <p className="text-black text-sm font-medium dark:text-gray-100">
          <div className="px-2">
            <p className="text-2xl font-semibold">{props.playbackUserData.videoName}</p>
            <p className="text-lg text-gray-500">{props.playbackUserData.description}</p>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
          <hr className="my-3" />
          <div>
            <div className="text-2xl text-gray-500 px-2">
              <button className="px-1">
                <i className="fas fa-share"></i>
              </button>
              <i className="px-1 fas fa-heart"></i>
              <button className="">
                <i className="px-1 fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
