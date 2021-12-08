import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import classes from '../Profile.module.css';
import moment from 'moment';
moment().format();

const AnnouncementCard = (props) => {
  //console.log(props);
  const [playing, setPlaying] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [seeMore, setSeeMore] = useState(false);

  const [time, setTime] = useState(null);

  const handleMouseMove = () => {
    setPlaying(true);
    if (props.post.post_video !== null && props.post.post_image) {
      setShowImage(false);
    }
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
    if (props.post.post_video !== null && props.post.post_image) {
      setShowImage(true);
    }
  };

  useEffect(() => {
    if (props.post.timestamp) {
      setTime(moment(Math.floor(props.post.timestamp)).fromNow());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const convertTimestampToTime = () => {
  //   const timestamp = new Date(props.playbackUserData.time * 1000); // This would be the timestamp you want to format
  //   setTime(moment(timestamp).fromNow());
  // };

  // useEffect(() => {
  //   convertTimestampToTime();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div
      className={`w-full  grid grid-cols-4  lg:flex-row py-3 px-3 bg-blue-50 shadow  rounded  dark:bg-dbeats-dark-secondary my-2 dark:text-gray-100 `}
    >
      {props.post.post_video || props.post.post_image ? (
        <div
          className={`cursor-pointer 2xl:w-80 2xl:h-52 lg:h-36 lg:w-52 h-44 w-80 dark:bg-dbeats-dark-primary  bg-gray-100`}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        >
          <a href={props.post.link} target="_blank" rel="noopener noreferrer">
            {showImage && props.post.post_image ? (
              <>
                <img
                  src={props.post.post_image}
                  alt="announcement_info"
                  className="mx-auto my-auto h-full w-auto"
                />
              </>
            ) : props.post.post_video ? (
              <ReactPlayer
                width="100%"
                height="100%"
                playing={playing}
                muted={false}
                volume={0.5}
                url={props.post.post_video}
                controls={false}
                className={classes.cards_videos}
              />
            ) : null}
          </a>
        </div>
      ) : null}
      <div
        className={`${
          props.post.post_video || props.post.post_image ? 'col-span-3' : 'col-span-4'
        } px-5 w-full`}
      >
        <p className="flex w-full justify-between text-black text-sm font-medium dark:text-gray-100">
          <div className="w-full">
            <div className="text-gray-500  ">{time}</div>
            <div className="flex flex-col 2xl:text-xl lg:text-md text-black text-sm font-medium dark:text-gray-100 w-full">
              <p
                className={`${!seeMore ? 'line-clamp-6' : ''} mr-2  `}
                style={{ wordBreak: 'break-words' }}
              >
                {props.post.announcement.split('\n').map(function (item) {
                  return (
                    <>
                      {item}
                      <br />
                    </>
                  );
                })}
                {}
              </p>

              {props.post.announcement.split(/\r\n|\r|\n/).length > 6 ? (
                <span
                  className="cursor-pointer text-md hover:underline text-gray-600"
                  onClick={() => setSeeMore(!seeMore)}
                >
                  {seeMore ? 'see less' : 'see more'}
                </span>
              ) : null}
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
  );
};

export default AnnouncementCard;
