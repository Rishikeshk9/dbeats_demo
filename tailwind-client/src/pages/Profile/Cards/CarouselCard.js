import React, { useState, useEffect } from 'react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ////console.log(props.playbackUserData)

  return (
    <div className="w-full h-auto  flex lg:flex-row flex-col py-3 px-3 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2">
      <div
        className={`cursor-pointer w-80 2xl:h-52 lg:h-32 h-44 dark:bg-dbeats-dark-primary  bg-gray-100`}
      >
        <a href={`/playback/${props.username}/${props.index}`}>
          <ReactPlayer
            width="100%"
            height="100%"
            playing={playing}
            muted={false}
            volume={0.5}
            url={props.playbackUserData.link}
            controls={false}
            className={classes.cards_videos}
            onMouseMove={handleMouseMove}
            onMouseLeave={hanldeMouseLeave}
          />
        </a>
      </div>
      <div className="col-start-1 row-start-3 py-2 px-5 w-full">
        <p className="flex justify-between text-black text-sm font-medium dark:text-gray-100">
          <div>
            <h4 className="playlist  mt-0  uppercase text-gray-500 tracking-widest text-md pb-2">
              {props.playbackUserData.category}
            </h4>
            <div className="">
              <p className="text-2xl font-semibold">{props.playbackUserData.videoName}</p>
              <div className="flex">
                <p className="text-lg text-gray-500 mr-2 mt-1">
                  {props.playbackUserData.description}
                </p>
              </div>
              <p className="text-sm text-gray-500">{time}</p>
            </div>
          </div>
          <div>
            <div className="text-2xl text-gray-500 ">
              <button className="px-1">
                <i className="fas fa-share"></i>
              </button>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
