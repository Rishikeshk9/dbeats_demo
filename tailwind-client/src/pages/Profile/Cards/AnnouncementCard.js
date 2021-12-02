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
      className={`w-full  grid grid-cols-4  lg:flex-row py-3 px-3 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2`}
    >
      {props.post.post_video || props.post.post_image ? (
        <div
          className={`cursor-pointer w-80 2xl:h-52 lg:h-32 h-44 dark:bg-dbeats-dark-alt bg-gray-100`}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        >
          <a href={props.post.link} target="_blank">
            {showImage && props.post.post_image ? (
              <>
                <img
                  src={props.post.post_image}
                  alt="Post Image"
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
            <div className="text-gray-500 text-xs">{time}</div>
            <div className="flex flex-col text-lg text-gray-500 w-full">
              <p
                className={`${!seeMore ? 'line-clamp-6' : ''} mr-2 mt-1 `}
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

export default AnnouncementCard;
