import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import classes from '../Profile.module.css';

const AnnouncementCard = (props) => {
  //console.log(props);
  const [playing, setPlaying] = useState(false);
  const [showImage, setShowImage] = useState(true);

  //const [time, setTime] = useState(null);

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

  // const convertTimestampToTime = () => {
  //   const timestamp = new Date(props.playbackUserData.time * 1000); // This would be the timestamp you want to format
  //   setTime(moment(timestamp).fromNow());
  // };

  // useEffect(() => {
  //   convertTimestampToTime();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  ////console.log(props.playbackUserData)

  return (
    <div className="w-full h-auto  flex lg:flex-row flex-col py-3 px-3 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2">
      {props.post.post_video || props.post.post_image ? (
        <div
          className={`cursor-pointer w-80 2xl:h-52 lg:h-32 h-44 dark:bg-dbeats-dark-alt bg-gray-100`}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        >
          {showImage && props.post.post_image ? (
            <img
              src={props.post.post_image}
              alt="Post Image"
              className="mx-auto my-auto h-full w-auto"
            />
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
        </div>
      ) : null}
      <div className="col-start-1 row-start-3 py-2 px-5 w-full">
        <p className="flex justify-between text-black text-sm font-medium dark:text-gray-100">
          <div>
            <div className="flex">
              <p className="text-lg text-gray-500 mr-2 mt-1">{props.post.announcement}</p>
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
