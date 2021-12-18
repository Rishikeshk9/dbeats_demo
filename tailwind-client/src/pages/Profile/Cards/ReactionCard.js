import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import classes from '../Profile.module.css';
import { ShareModal } from '../../../component/Modals/ShareModal/ShareModal';

const ReactionCard = (props) => {
  const [playing, setPlaying] = useState(false);

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  const [show, setShow] = useState(false);
  //console.log(show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = 'Copy Link To Clipboard';
  const [buttonText, setButtonText] = useState(text);

  let sharable_data = `${process.env.REACT_APP_CLIENT_URL}/playback/${props.playbackUserData.link}`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  //console.log(show);

  return (
    <div className="w-full flex lg:flex-row flex-col 2xl:py-3 2xl:px-3 lg:p-1.5 bg-white rounded-xl dark:bg-dbeats-dark-primary dark:text-gray-100 my-2">
      <div className={`cursor-pointer lg:h-28 2xl:h-48 lg:w-1/3 w-full  my-auto `}>
        <a href={`/playback/${props.playbackUserData.link}`}>
          <ReactPlayer
            width="100%"
            height="100%"
            playing={playing}
            muted={false}
            volume={0.5}
            url={props.playbackUserData.video.link}
            controls={false}
            className={classes.cards_videos}
            onMouseMove={handleMouseMove}
            onMouseLeave={hanldeMouseLeave}
          />
        </a>
      </div>
      <div className="col-start-1 row-start-3 py-2 px-5 w-full">
        <p className="text-black text-sm font-medium dark:text-gray-100">
          <div className="px-2">
            <p className="2xl:text-2xl lg:text-lg font-semibold">
              {props.playbackUserData.video.videoName}
            </p>
            <p className="text-xs text-gray-500">{props.playbackUserData.video.description}</p>
          </div>
          <hr className="my-3" />
          <div>
            <div className="2xl:text-2xl lg:text-lg text-gray-500 px-2">
              <button className="px-1" onClick={handleShow}>
                <i className="fas fa-share"></i>
              </button>
              {like ? <i className="fas fa-heart text-red-700 animate-pulse ml-1"></i> : null}
              {dislike ? <i className="fas fa-heart-broken text-purple-500 ml-1"></i> : null}
              {happy ? <i className="fas fa-laugh-squint text-yellow-500 ml-1"></i> : null}
              {angry ? <i className="fas fa-angry text-red-800 ml-1"></i> : null}
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