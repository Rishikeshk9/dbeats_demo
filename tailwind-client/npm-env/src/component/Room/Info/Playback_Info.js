import React, { useEffect, useState, Fragment } from 'react';
import classes from './Info.module.css';
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
import Modal from 'react-awesome-modal';

const PlayBackInfo = (props) => {
  let sharable_data = `https://dbeats-demo.vercel.app /playback/${props.stream_id}/${props.video_id}`;

  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [happy, setHappy] = useState(0);
  const [angry, setAngry] = useState(0);
  const [userreact, setUserreact] = useState('');

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
      };
      console.log('reaction: ', reactionData);

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
            console.log(response.data);
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

  const handlereaction = (videoprops) => {
    const reactionData = {
      reactusername: `${user.username}`,
      videousername: `${userData.username}`,
      reaction: videoprops,
      videoname: `${props.stream_id}/${props.video_id}`,
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
  };

  useEffect(() => {
    get_User();
    fetchData();
    let value = JSON.parse(window.localStorage.getItem('user'));
    console.log(value);

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
  return (
    <div className=" ">
      <div className={`  grid sm:grid-cols-1 lg:grid-cols-3 grid-flow-row pt-3 pb-50 `}>
        <div className=" col-span-2 ">
          <div>
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
          <div className="mx-7 px-7">
            <div className="flex justify-between my-2  ">
              <div className="py-4">
                <div className=" w-full text-left mt-0" style={{ padding: '0px' }}>
                  {userData ? (
                    <p className="font-semibold text-xl pb-4">{userData.videos[0].videoName}</p>
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
                    <button className="bg-gradient-to-r from-dbeats-light  to-purple-900  p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white ">
                      <i className="fas fa-volleyball-ball mr-1"></i>
                      <span>Appreciate</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="text-2xl py-4 flex  ">
                <div className="  text-center mx-3">
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

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
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
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Duplicate</button>
                        </Menu.Item>
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
                <p className="pb-2">{userData.videos[0].description}</p>
                <hr />
              </div>
            ) : (
              <></>
            )}
            <div className={`${classes.comment_section}`}>
              <iframe
                className={`${classes.convo_frame}`}
                title="comment"
                src="https://theconvo.space/embed/dt?threadId=KIGZUnR4RzXDFheXoOwo"
                allowtransparency="true"
                loading="eager"
              />
            </div>
          </div>
        </div>
        <div className="  w-full col-span-1 px-5 pt-3">
          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            {arrayData.map((value, index) => {
              return <RecommendedCard key={index} value={value} />;
            })}
          </div>
        </div>
      </div>
      <Modal
        visible={show}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
              <Col className="flex justify-around align-center">
                <WhatsappShareButton url={sharable_data}>
                  <WhatsappIcon iconFillColor="white" size={60} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton url={sharable_data}>
                  <FacebookIcon iconFillColor="white" size={60} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={sharable_data}>
                  <EmailIcon iconFillColor="white" size={60} round={true} />
                </EmailShareButton>
                <PinterestShareButton url={sharable_data}>
                  <PinterestIcon iconFillColor="white" size={60} round={true} />
                </PinterestShareButton>
                <TelegramShareButton url={sharable_data}>
                  <TelegramIcon iconFillColor="white" size={60} round={true} />
                </TelegramShareButton>
              </Col>
            </Row>
            <Row>
              <CopyToClipboard
                text={sharable_data}
                className="block mx-auto p-2 mt-4 mb-2 w-96 text-white font-semibold rounded-lg bg-dbeats-light"
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

export default PlayBackInfo;
