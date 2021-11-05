import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import classes from '../Profile.module.css';
import { ShareModal } from '../../Modals/ShareModal/ShareModal';

const ReactionCard = (props) => {
  const [playing, setPlaying] = useState(false);

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  const [show, setShow] = useState(false);
  console.log(show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = 'Copy Link To Clipboard';
  const [buttonText, setButtonText] = useState(text);

  let sharable_data = `https://dbeats.live/playback/${props.playbackUserData.link}`;

  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [happy, setHappy] = useState(0);
  const [angry, setAngry] = useState(0);

  useEffect(() => {
    if (props.playbackUserData.reaction === 'happy') {
      setHappy(1);
    } else if (props.playbackUserData.reaction === 'like') {
      setLike(1);
    } else if (props.playbackUserData.reaction === 'dislike') {
      setDislike(1);
    } else if (props.playbackUserData.reaction === 'angry') {
      setAngry(1);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  console.log(show);

  return (
    <div className="w-full  flex lg:flex-row flex-col py-3 px-3 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2">
      <div className={`cursor-pointer lg:w-1/3 w-full  my-auto `}>
        <ReactPlayer
          onClick={() => {
            window.location.href = `/playback/${props.playbackUserData.link}`;
          }}
          width="100%"
          height="auto"
          playing={playing}
          muted={false}
          volume={0.5}
          url={props.playbackUserData.video.link}
          controls={false}
          className={classes.cards_videos}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      <div className="col-start-1 row-start-3 py-2 px-5 w-full">
        <p className="text-black text-sm font-medium dark:text-gray-100">
          <div className="px-2">
            <p className="text-2xl font-semibold">{props.playbackUserData.video.videoName}</p>
            <p className="text-xs text-gray-500">{props.playbackUserData.video.description}</p>
          </div>
          <hr className="my-3" />
          <div>
            <div className="text-2xl text-gray-500 px-2">
              <button className="px-1" onClick={handleShow}>
                <i className="fas fa-share"></i>
              </button>
              {like ? <i className="fas fa-heart text-red-700 animate-pulse ml-1"></i> : <></>}
              {dislike ? <i className="fas fa-heart-broken text-purple-500 ml-1"></i> : <></>}
              {happy ? <i className="fas fa-laugh-squint text-yellow-500 ml-1"></i> : <></>}
              {angry ? <i className="fas fa-angry text-red-800 ml-1"></i> : <></>}
            </div>
          </div>
        </p>
      </div>
      <ShareModal
        show={show}
        handleClose={handleClose}
        sharable_data={sharable_data}
        copybuttonText={buttonText}
        setCopyButtonText={setButtonText}
      />
    </div>
  );
};

export default ReactionCard;
