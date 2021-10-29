import React, { useEffect, useState, Fragment } from 'react';
//import playimg from "../../../assets/images/telegram.png";
import axios from 'axios';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Menu, Transition } from '@headlessui/react';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RecommendedCard from './RecommendedCard';
import Modal from 'react-modal';
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';
import { useSelector } from 'react-redux';
import animationData from '../../../lotties/fans.json';
import animationDataConfetti from '../../../lotties/confetti.json';
import animationDataGiraffee from '../../../lotties/giraffee.json';
import Lottie from 'react-lottie';
import superfluid from '../../../assets/images/superfluid-black.svg';
import { Playlist } from '../../Navbar/PopModals';
import moment from 'moment';
moment().format();

const PlayBackInfo = (props) => {
  let sharable_data = `https://dbeats.live/playback/${props.stream_id}/${props.video_id}`;
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  const [showSubscriptionModal, setshowSubscriptionModal] = useState(false);

  const handleShowSubscriptionModal = () => setshowSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setshowSubscriptionModal(false);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [happy, setHappy] = useState(0);
  const [angry, setAngry] = useState(0);
  const [userreact, setUserreact] = useState('');

  const [showPlaylist, setShowPlaylist] = useState(false);
  const handleClosePlaylist = () => setShowPlaylist(false);
  const handleShowPlaylist = () => setShowPlaylist(true);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: false,
    animationData: animationDataConfetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultOptions3 = {
    loop: true,
    autoplay: false,
    animationData: animationDataGiraffee,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  //const [videoUsername, setVideoUsername] = useState('');

  const user = JSON.parse(window.localStorage.getItem('user'));

  const [playbackUrl, setPlaybackUrl] = useState('');

  const [userData, setUserData] = useState(null);

  const [privateUser, setPrivate] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const text = 'Copy Link To Clipboard';
  const [buttonText, setButtonText] = useState(text);

  const [subscribeButtonText, setSubscribeButtonText] = useState('Subscribe');

  const [arrayData, setArrayData] = useState([]);

  const [time, setTime] = useState(null);

  const convertTimestampToTime = (timeData) => {
    const timestamp = new Date(timeData.time * 1000); // This would be the timestamp you want to format
    setTime(moment(timestamp).fromNow());
  };

  // const SuperfluidSDK = require("@superfluid-finance/js-sdk");
  // const { Web3Provider } = require("@ethersproject/providers");

  // const sf = new SuperfluidSDK.Framework({
  //   ethers: new Web3Provider(window.ethereum),
  // });

  const trackFollowers = () => {
    const followData = {
      following: `${userData.username}`,
      follower: `${user.username}`,
    };
    if (subscribeButtonText === 'Subscribe') {
      setSubscribeButtonText('Unsubscribe');
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/follow`,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: followData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setSubscribeButtonText('Subscribe');
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/unfollow`,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: followData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const get_User = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${props.stream_id}`).then((value) => {
      setUserData(value.data);
      convertTimestampToTime(value.data.videos[props.video_id]);
      for (let i = 0; i < value.data.follower_count.length; i++) {
        if (user ? value.data.follower_count[i] === user.username : false) {
          setSubscribeButtonText('Unsubscribe');
          break;
        }
      }

      //setVideoUsername(value.data.username);
      setPlaybackUrl(`${value.data.videos[props.video_id].link}`);

      let reactionData = {
        videousername: value.data.username,
        videoname: `${props.stream_id}/${props.video_id}`,
        videolink: `${value.data.videos[props.video_id].link}`,
      };
      //console.log('reaction: ', reactionData);

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/getreactions`,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: reactionData,
      })
        .then(function (response) {
          console.log(response);
          setLike(response.data.reaction.like.length);
          setDislike(response.data.reaction.dislike.length);
          setAngry(response.data.reaction.angry.length);
          setHappy(response.data.reaction.happy.length);
        })
        .catch(function (error) {
          console.log(error);
        });

      if (user) {
        reactionData = {
          username: `${user.username}`,
          videousername: value.data.username,
          videoname: `${props.stream_id}/${props.video_id}`,
          videolink: `${value.data.videos[props.video_id].link}`,
        };

        axios({
          method: 'POST',
          url: `${process.env.REACT_APP_SERVER_URL}/user/getuserreaction`,
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          data: reactionData,
        })
          .then(function (response) {
            //console.log(response.data);
            setUserreact(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });

    //console.log(value.data)
  };

  const fetchData = async () => {
    const fileRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
    for (let i = 0; i < fileRes.data.array.length; i++) {
      if (fileRes.data.array[i].videos) {
        if (user ? fileRes.data.array[i].username === user.username : false) {
          continue;
        }
        if (
          fileRes.data.array[i].username !== props.stream_id &&
          fileRes.data.array[i].videos.length > 0
        ) {
          setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
        }
      }
    }
    //console.log(fileRes, "Hi");
    //await sf.initialize();
  };

  // console.log('userData', userData);
  // console.log(userData ? userData.videos[props.video_id].link : '');

  const handlereaction = (videoprops) => {
    if (userreact == '') {
      const reactionData = {
        reactusername: `${user.username}`,
        videousername: `${userData.username}`,
        reaction: videoprops,
        videostreamid: `${props.stream_id}`,
        videoindex: `${props.video_id}`,
        videolink: `${userData.videos[props.video_id].link}`,
      };

      if (videoprops === 'like') {
        setLike(like + 1);
        setUserreact('like');
      } else if (videoprops === 'dislike') {
        setDislike(dislike + 1);
        setUserreact('dislike');
      } else if (videoprops === 'happy') {
        setHappy(happy + 1);
        setUserreact('happy');
      } else {
        setAngry(angry + 1);
        setUserreact('angry');
      }

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/reactions`,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: reactionData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const reactionData = {
        reactusername: `${user.username}`,
        videousername: `${userData.username}`,
        newreaction: videoprops,
        oldreaction: userreact,
        videostreamid: `${props.stream_id}`,
        videoindex: `${props.video_id}`,
        videolink: `${userData.videos[props.video_id].link}`,
      };

      if (videoprops === userreact) {
        if (videoprops === 'like') {
          setLike(like - 1);
        } else if (videoprops === 'dislike') {
          setDislike(dislike - 1);
        } else if (videoprops === 'happy') {
          setHappy(happy - 1);
        } else {
          setAngry(angry - 1);
        }
        setUserreact('');
      } else {
        if (videoprops === 'like') {
          setLike(like + 1);
          setUserreact('like');
        } else if (videoprops === 'dislike') {
          setDislike(dislike + 1);
          setUserreact('dislike');
        } else if (videoprops === 'happy') {
          setHappy(happy + 1);
          setUserreact('happy');
        } else {
          setAngry(angry + 1);
          setUserreact('angry');
        }

        if (userreact === 'like') {
          setLike(like - 1);
        } else if (userreact === 'dislike') {
          setDislike(dislike - 1);
        } else if (userreact === 'happy') {
          setHappy(happy - 1);
        } else {
          setAngry(angry - 1);
        }
      }

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/removeuserreaction`,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: reactionData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //const handlePlaylist = () => {};

  useEffect(() => {
    get_User();
    fetchData();
    let value = JSON.parse(window.localStorage.getItem('user'));
    //console.log(value);

    if (user ? value.username === props.stream_id : false) {
      setPrivate(true);
    } else {
      setPrivate(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  //console.log(arrayData);

  const testFlow = async (amount) => {
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
    });
    await sf.initialize();

    const carol2 = sf.user({
      address: walletAddress[0],

      // fDAIx token, which is a test Super Token on Goerli network
      token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',
    });

    await carol2.flow({
      recipient: '0xF976A17dE1945C6977725aE289A1c2EA5d036789',
      // This flow rate is equivalent to 1 tokens per month, for a token with 18 decimals.
      flowRate: 385802469135 * amount,
    });

    const details = await carol2.details();
    console.log(details.cfa.flows.outFlows[0]);
  };
  return (
    <div>
      <div
        className={`${
          darkMode && 'dark'
        }  grid sm:grid-cols-1 lg:grid-cols-3 grid-flow-row pt-3 pb-50 mt-10 lg:ml-12  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary`}
      >
        <div className=" lg:col-span-2 dark:bg-dbeats-dark-alt text-black   dark:text-white">
          <div className="self-center lg:px-8 w-screen lg:w-full lg:mt-3 mt-0.5">
            {userData ? (
              <VideoPlayer
                playbackUrl={playbackUrl}
                name={userData.name}
                username={userData.username}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="lg:mx-7 lg:px-7 px-3 dark:bg-dbeats-dark-alt">
            <div className="lg:flex flex-row justify-between lg:my-2 my-1  ">
              <div className="py-4">
                <div className=" w-full text-left mt-0" style={{ padding: '0px' }}>
                  {userData ? (
                    <p className="font-semibold text-xl pb-4">
                      {userData.videos[props.video_id].videoName}
                    </p>
                  ) : (
                    <></>
                  )}
                  {time ? (
                    <p className="font-semibold text-md text-gray-400 pb-4">{time}</p>
                  ) : (
                    <></>
                  )}
                </div>
                {!privateUser ? (
                  <div>
                    {user ? (
                      <button
                        className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                        onClick={trackFollowers}
                      >
                        <span>{subscribeButtonText}</span>
                      </button>
                    ) : (
                      <button
                        className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                        onClick={() => {
                          window.location.href = '/login';
                        }}
                      >
                        <span>Login</span>
                      </button>
                    )}
                    <button className="bg-dbeats-light    p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white ">
                      <i className="fas fa-dice-d20  mr-1 cursor-pointer"></i>
                      <span onClick={handleShowSubscriptionModal}>Become a SuperFan</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="text-2xl lg:py-4 py-2 flex justify-around">
                <div className="  text-center lg:mx-3">
                  <button className="border-0 bg-transparent" onClick={handleShow}>
                    <i className="fas fa-share opacity-50 mx-2"></i>
                  </button>
                  <br />
                  <p className="text-base"> SHARE</p>
                </div>

                <div className="  text-center">
                  <i
                    className={
                      userreact === 'like'
                        ? 'cursor-pointer fas fa-heart mx-3 text-red-700 animate-pulse'
                        : 'cursor-pointer fas fa-heart opacity-20 mx-3 hover:text-red-300  hover:opacity-100'
                    }
                    onClick={() => handlereaction('like')}
                  ></i>
                  <br />
                  <p className="text-base">{like}</p>
                </div>
                <div className="  text-center">
                  <i
                    className={
                      userreact === 'dislike'
                        ? 'cursor-pointer fas fa-heart-broken mx-3   text-purple-500'
                        : 'cursor-pointer fas fa-heart-broken opacity-20 mx-3 hover:text-purple-300 hover:opacity-100'
                    }
                    onClick={() => handlereaction('dislike')}
                  ></i>
                  <br />
                  <p className="text-base">{dislike}</p>
                </div>
                <div className="  text-center">
                  <i
                    className={
                      userreact === 'happy'
                        ? 'cursor-pointer far fa-laugh-squint mx-3 text-yellow-500 '
                        : 'cursor-pointer far fa-laugh-squint opacity-20 mx-3 hover:text-yellow-200  hover:opacity-100'
                    }
                    onClick={() => handlereaction('happy')}
                  ></i>{' '}
                  <br />
                  <p className="text-base"> {happy}</p>
                </div>
                <div className="  text-center">
                  <i
                    className={
                      userreact === 'angry'
                        ? 'cursor-pointer far fa-angry  mx-3 text-red-800'
                        : 'cursor-pointer far fa-angry  opacity-20 mx-3 hover:text-red-300 hover:opacity-100'
                    }
                    onClick={() => handlereaction('angry')}
                  ></i>{' '}
                  <br />
                  <p className="text-base"> {angry}</p>
                </div>

                <Menu as="div" className="relative inline-block text-left" style={{ zIndex: 100 }}>
                  <div style={{ zIndex: 50 }}>
                    <Menu.Button>
                      <i className="fas fa-ellipsis-h opacity-50 mx-2"></i>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Edit</button>
                        </Menu.Item>
                        {user ? (
                          <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                            <button
                              onClick={() => {
                                handleShowPlaylist();
                              }}
                            >
                              Add to Playlist
                            </button>
                          </Menu.Item>
                        ) : (
                          <> </>
                        )}
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Archive</button>
                        </Menu.Item>
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Move</button>
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Delete</button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            {userData ? (
              <div className="w-full">
                <hr />
                <h4 className="py-2">Description : </h4>
                <p className="pb-2">{userData.videos[props.video_id].description}</p>
                <hr />
              </div>
            ) : (
              <></>
            )}
            <div className="bg-blue-50">
              <iframe
                className="w-full p-0 m-0 h-88 lg:h-88 mb-40"
                title="comment"
                src="https://theconvo.space/embed/dt?threadId=KIGZUnR4RzXDFheXoOwo"
                allowtransparency="true"
                loading="eager"
              />
            </div>
          </div>
        </div>
        <div className="  w-full col-span-1 px-5 lg:pt-3 dark:bg-dbeats-dark-alt text-black  dark:text-white">
          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            {arrayData.map((value, index) => {
              return <RecommendedCard key={index} value={value} />;
            })}
          </div>
        </div>
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
      <Modal
        visible={showSubscriptionModal}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter "
        centered
      >
        <div className={`${darkMode && 'dark'} h-max w-max`}>
          <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4   text-center relative bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50  dark:bg-gradient-to-b dark:from-dbeats-dark-primary  dark:to-dbeats-dark-primary">
            <div className="col-span-5    text-gray-900 dark:text-gray-100 font-bold">SUPERFAN</div>
            <div
              className="ml-5 cursor-pointer text-gray-900 dark:text-gray-100 dark:bg-dbeats-dark-primary absolute right-10 top-5"
              onClick={handleCloseSubscriptionModal}
            >
              <i className="fas fa-times"></i>
            </div>
          </h2>

          <div>
            <Container className="px-4 pb-4 bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-primary  dark:to-dbeats-dark-primary">
              <div className="relative grid grid-cols-6">
                <div className="   col-span-2">
                  <Lottie options={defaultOptions2} height={200} width={500} />
                </div>
                <div className="col-span-2 ">
                  <Lottie options={defaultOptions} height={200} width={300} />
                </div>
                <div className="   col-span-2">
                  <Lottie options={defaultOptions3} height={200} width={500} />
                </div>
              </div>
              {/* 
                  <button
                    onClick={handleCloseSubscriptionModal}
                    className=" block text-center col-span-1 px-5 w-full  mx-auto p-2 mt-4 mb-2  text-dbeats-light font-semibold rounded-lg border  border-dbeats-light hover:border-white hover:text-white hover:bg-dbeats-dark-secondary transition-all transform hover:scale-95"
                  >
                    Cancel
                  </button> */}

              <Row>
                <div className="grid grid-cols-6 gap-4 w-full   self-center">
                  <button
                    onClick={() => testFlow(10)}
                    className="  h-max shadow text-center col-span-6 lg:col-span-2   w-full  mx-auto p-2   text-black dark:text-white font-semibold hover:rounded   border dark:bg-dbeats-dark-alt border-dbeats-light hover:shadow-none transition-all transform hover:scale-99 hover:bg-dbeats-light "
                  >
                    <span className="font-bold text-2xl">10 DAI</span>
                    <br></br>
                    <span>PER MONTH</span>
                    <br></br>
                    <p className="text-sm font-thin text-gray-800 dark:text-gray-300">
                      Fans who contribute at this level get my thanks and access to recipes and
                      flash fiction.{' '}
                    </p>
                  </button>
                  <button
                    onClick={() => testFlow(30)}
                    className="  shadow text-center col-span-6 lg:col-span-2   w-full  mx-auto p-2    text-black dark:text-white font-semibold   border dark:bg-dbeats-dark-alt border-dbeats-light hover:shadow-none transition-all transform hover:scale-99 hover:bg-dbeats-light "
                  >
                    <span className="font-bold text-2xl">30 DAI</span>
                    <br></br>
                    <span>PER MONTH</span>
                    <br></br>
                    <span className="text-sm font-thin text-gray-800 dark:text-gray-300">
                      You get all the goodies, my thanks, written content, and you will see concept
                      art for my Video Content before it goes public..{' '}
                    </span>
                  </button>
                  <button
                    onClick={() => testFlow(20)}
                    className="block shadow text-center col-span-6 lg:col-span-2   w-full  mx-auto p-2  text-black dark:text-white font-semibold   border dark:bg-dbeats-dark-alt border-dbeats-light hover:shadow-none transition-all transform hover:scale-99 hover:bg-dbeats-light "
                  >
                    <span className="font-bold text-2xl">20 DAI</span>
                    <br></br>
                    <span>PER MONTH</span>
                    <br></br>
                    <span className="text-sm font-thin text-gray-800 dark:text-gray-300">
                      Fans who contribute at this level get my thanks and access to recipes and
                      flash fiction.{' '}
                    </span>
                  </button>
                </div>
              </Row>
              <Row className="self-center text-center mt-5 dark:text-gray-500 font-semibold">
                powered by{' '}
                <img
                  src={superfluid}
                  className="h-10 rounded w-max  self-center mx-auto bg-white p-2 dark:bg-opacity-75"
                ></img>
              </Row>
            </Container>
          </div>
        </div>
      </Modal>
      {userData && userData.videos ? (
        <Playlist
          showPlaylist={showPlaylist}
          setShowPlaylist={setShowPlaylist}
          handleClosePlaylist={handleClosePlaylist}
          handleShowPlaylist={handleShowPlaylist}
          videoData={userData.videos[props.video_id]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayBackInfo;
