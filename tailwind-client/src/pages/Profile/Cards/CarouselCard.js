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
    <div id="tracks-section" className="py-0.5 ">
      <div
        className={`w-full  flex  lg:flex-row flex-col sm:py-3 pb-3 
      bg-gray-50 shadow-lg  rounded  dark:bg-dbeats-dark-secondary 
      my-2 dark:text-gray-100 
      lg:px-3 2xl:px-3`}
      >
        <div
          className={`cursor-pointer lg:h-32 2xl:h-48 lg:w-1/3 w-full  my-auto dark:bg-dbeats-dark-primary `}
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
              className={`${classes.cards_videos}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={hanldeMouseLeave}
            />
          </a>
        </div>
        <div className="col-start-1 row-start-3 py-1 px-5 w-full">
          <p className="flex justify-between pt-2 sm:pb-1 text-black text-sm font-medium dark:text-gray-100">
            <div>
              <h4 className="playlist    uppercase text-gray-500 tracking-widest 2xl:text-md lg:text-xs text-xs pb-1 ">
                {props.playbackUserData.category}
              </h4>
              <div className="">
                <p className="2xl:text-2xl lg:text-md font-semibold">
                  {props.playbackUserData.videoName}
                </p>
                <div className="flex">
                  <p className="2xl:text-lg lg:text-xs text-gray-500 mr-2 mt-1">
                    {props.playbackUserData.description}
                  </p>
                </div>
                <p className="2xl:text-sm lg:text-xs text-gray-500 lg:my-3 2xl:my-0">{time}</p>
              </div>
            </div>
            <div>
              <div className="2xl:text-2xl lg:text-lg text-gray-500 ">
                <button className="px-1">
                  <i className="fas fa-share"></i>
                </button>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
