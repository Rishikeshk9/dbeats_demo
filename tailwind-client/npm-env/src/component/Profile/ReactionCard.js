import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import classes from './Profile.module.css';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from 'react-modal';

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
      <Modal isOpen={show} className="h-max lg:w-max w-5/6 bg-white mx-auto lg:mt-60 mt-32 shadow ">
        <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4">
          <div className="col-span-4 pl-14">Share link on</div>
          <div className="ml-5" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </div>
        </h2>
        <hr className="py-4" />
        <div>
          <Container className="px-12 pb-4">
            <Row>
              <Col className="flex lg:justify-around justify-center align-center flex-wrap">
                <div className="px-1 py-1">
                  <WhatsappShareButton url={sharable_data}>
                    <WhatsappIcon iconFillColor="white" size={60} round={true} />
                  </WhatsappShareButton>
                </div>
                <div className="px-1 py-1">
                  <FacebookShareButton url={sharable_data}>
                    <FacebookIcon iconFillColor="white" size={60} round={true} />
                  </FacebookShareButton>
                </div>
                <div className="px-1 py-1">
                  <EmailShareButton url={sharable_data}>
                    <EmailIcon iconFillColor="white" size={60} round={true} />
                  </EmailShareButton>
                </div>
                <div className="px-1 py-1">
                  <PinterestShareButton url={sharable_data}>
                    <PinterestIcon iconFillColor="white" size={60} round={true} />
                  </PinterestShareButton>
                </div>
                <div className="px-1 py-1">
                  <TelegramShareButton url={sharable_data}>
                    <TelegramIcon iconFillColor="white" size={60} round={true} />
                  </TelegramShareButton>
                </div>
              </Col>
            </Row>
            <Row>
              <CopyToClipboard
                text={sharable_data}
                className="block mx-auto p-2 mt-4 mb-2 lg:w-96 w-full  text-white font-semibold rounded-lg bg-dbeats-light"
              >
                <button type="submit" onClick={() => setButtonText('Link Copied!')}>
                  {buttonText}
                </button>
              </CopyToClipboard>
            </Row>
          </Container>
        </div>
        <hr className="py-2" />
      </Modal>
    </div>
  );
};

export default ReactionCard;
