import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselCard from './CarouselCard';
import person from '../../assets/images/profile.svg';
import background from '../../assets/images/wallpaper.jpg';
import ChannelSection from './ChannelSection';

import Modal from 'react-awesome-modal';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';

import { Tab } from '@headlessui/react';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [privateUser, setPrivate] = useState(true);

  const [sharable_data, setSharable_data] = useState('');

  const [pinnedData, setPinnedData] = useState([]);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [buttonText, setButtonText] = useState('SUBSCRIBE');

  const myData = JSON.parse(window.localStorage.getItem('user'));

  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const get_User = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${props.match.params.username}`)
      .then((value) => {
        setUser(value.data);
        if (value.pinned) {
          setPinnedData(value.pinned);
        }
        for (let i = 0; i < value.data.follower_count.length; i++) {
          if (value.data.follower_count[i] === myData.username) {
            setButtonText('UNSUBSCRIBE');
            break;
          }
        }
        setSharable_data(`https://dbeats-demo.vercel.app /profile/${value.data.username}`);
        setFollowers(value.data.follower_count.length);
        setFollowing(value.data.followee_count.length);
      });
  };

  //console.log(user);
  const trackFollowers = () => {
    console.log(followers);
    const followData = {
      following: `${user.username}`,
      follower: `${myData.username}`,
    };
    if (buttonText === 'SUBSCRIBE') {
      setButtonText('UNSUBSCRIBE');
      setFollowers(followers + 1);
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
            console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setButtonText('SUBSCRIBE');
      setFollowers(followers - 1);
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
            console.log(response);
          } else {
            alert('Invalid Login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const UnPinningUser = (pinnedUser) => {
    const UnPinningData = {
      username: myData.username,
      pinneduser: pinnedUser,
    };

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/unpin`,
      data: UnPinningData,
    })
      .then((response) => {
        let value = [];
        for (let i = 0; i < pinnedData.length; i++) {
          if (pinnedData[i] != pinnedUser) {
            value.push(pinnedData[i]);
          }
        }
        console.log(response);
        setPinnedData(value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const PinningUser = (pinnedUser) => {
    const PinningData = {
      username: myData.username,
      pinneduser: pinnedUser,
    };

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/pinned`,
      data: PinningData,
    })
      .then((response) => {
        console.log(response);
        setPinnedData((prevData) => [...prevData, pinnedUser]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let value = JSON.parse(window.localStorage.getItem('user'));
    console.log(value);
    if (value.username === props.match.params.username) {
      setUser(value);
      setSharable_data(`https://dbeats-demo.vercel.app /profile/${value.username}`);
      setPrivate(true);
      setFollowers(value.follower_count.length);
      setFollowing(value.followee_count.length);
      if (value.pinned) {
        setPinnedData(value.pinned);
      }
    } else {
      get_User();
      setPrivate(false);
    }
  }, []);

  return (
    <>
      {user ? (
        <div>
          <div id="outer-container" className="">
            <div id="page-wrap" className={`${darkMode && 'dark'} grid lg:pl-18 grid-cols-6`}>
              <ChannelSection privateUser={privateUser} user={user} />
              <div className="px-5 h-max col-span-5 w-full mt-16">
                <div id="display_details" className="  pt-3 h-full">
                  <div className="bg-white dark:bg-dbeats-dark-primary pb-3 ">
                    <div className="block">
                      <img src={background} style={{ width: '100%', height: '22rem' }} />
                    </div>
                    <div className="w-full">
                      <div className="w-full flex -mt-28 ml-5">
                        <div className="w-56 ">
                          <div className="px-1 py-1 shadow-sm w-44 h-44   bg-white rounded-full   dark:bg-dbeats-dark-primary">
                            <img
                              src={person}
                              alt=""
                              className="relative w-42 h-42 align-middle items-center  rounded-full "
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col ml-3 mr-5 ">
                          <div className="text-white pb-5">
                            <div className="flex w-max">
                              <span className="font-bold text-3xl mr-3">{user.name}</span>
                              {!privateUser ? (
                                <button
                                  href="#"
                                  className="no-underline cursor-pointer border-dbeats-light border-1  text-dbeats-light hover:bg-dbeats-light hover:text-white rounded font-bold mr-1 flex self-center   py-1 px-3"
                                  onClick={trackFollowers}
                                >
                                  <i className="fas fa-plus self-center"></i>
                                  &nbsp;{buttonText}
                                </button>
                              ) : (
                                <></>
                              )}
                              <button
                                onClick={handleShow}
                                className="no-underline cursor-pointer border-white border-1  text-blue-50 hover:bg-white hover:text-dbeats-light rounded font-bold mr-1 flex self-center   py-1 px-3"
                              >
                                <i className="fas fa-share-alt self-center mr-2 "></i> SHARE
                              </button>
                            </div>
                            <span className="font-semibold">@{user.username}</span>
                          </div>
                          <div className="flex text-gray-400 py-3 pt-12 dark:bg-dbeats-dark-primary">
                            <div className="grid grid-flow-rows grid-cols-5   gap-4">
                              <div className="font-bold mx-auto   px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {user.videos ? user.videos.length : 0}{' '}
                                </span>
                                VIDEOS
                              </div>
                              <div className="font-bold mx-auto   px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {/*{user.subscribers ? <>{user.subscribers.length}</> : 0}{" "}*/}
                                  {followers}{' '}
                                </span>
                                FOLLOWERS
                              </div>
                              <div className="font-bold  mx-auto  px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {/*{user.subscribed ? <>{user.subscribed.length}</> : 0}{" "}*/}
                                  {following}{' '}
                                </span>
                                FOLLOWING
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-96 relative mb-20 ">
                    <Tab.Group>
                      <Tab.List className="flex px-1 space-x-1 bg-white  dark:bg-dbeats-dark-primary ">
                        {privateUser ? (
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                'w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ',
                                selected
                                  ? 'text-dbeats-light font-bold border-b-2 border-dbeats-light'
                                  : 'hover:bg-black/[0.12]  hover:text-gray-100',
                              )
                            }
                          >
                            Subscribed Channels
                          </Tab>
                        ) : (
                          <></>
                        )}
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ',
                              selected
                                ? 'text-dbeats-light font-bold border-b-2 border-dbeats-light'
                                : 'hover:bg-black/[0.12]  hover:text-gray-100',
                            )
                          }
                        >
                          VIDEOS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ',
                              selected
                                ? 'text-dbeats-light font-bold border-b-2 border-dbeats-light'
                                : 'hover:bg-black/[0.12]  hover:text-gray-100',
                            )
                          }
                        >
                          ALBUMS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ',
                              selected
                                ? 'text-dbeats-light font-bold border-b-2 border-dbeats-light'
                                : 'hover:bg-black/[0.12]  hover:text-gray-100',
                            )
                          }
                        >
                          PLAYLISTS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ',
                              selected
                                ? 'text-dbeats-light font-bold border-b-2 border-dbeats-light'
                                : 'hover:bg-black/[0.12]  hover:text-gray-100',
                            )
                          }
                        >
                          REPOSTS
                        </Tab>
                      </Tab.List>

                      <Tab.Panels className="dark:bg-dbeats-dark-alt w-full h-full">
                        {privateUser ? (
                          <Tab.Panel className="">
                            <div className="px-5 pt-10 grid grid-cols-4 grid-flow-row  ">
                              {user.followee_count ? (
                                <div>
                                  {user.followee_count.map((following, i) => {
                                    //console.log(playbackUser)
                                    return (
                                      <div
                                        key={i}
                                        className="flex text-lg shadow px-10 my-5 py-2 dark:bg-dbeats-dark-primary dark:text-gray-100"
                                      >
                                        {pinnedData.indexOf(following) > -1 ? (
                                          <i
                                            className="fas fa-thumbtack mx-3 my-auto text-xl cursor-pointer "
                                            onClick={() => UnPinningUser(following)}
                                          ></i>
                                        ) : (
                                          <i
                                            className="fas fa-thumbtack mx-3 my-auto text-xl opacity-20 hover:opacity-100 cursor-pointer -rotate-45 transform"
                                            onClick={() => PinningUser(following)}
                                          ></i>
                                        )}
                                        <h2>{following}</h2>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p>0 Subscribed</p>
                              )}
                            </div>
                          </Tab.Panel>
                        ) : (
                          <></>
                        )}
                        <Tab.Panel className="">
                          <div className="px-5 pt-10 dark:bg-dbeats-dark-alt">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div className="px-5 pt-10 h-72">Reposts</div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
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
              <div className={`${darkMode && 'dark'}`}>
                <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4 dark:bg-dbeats-dark-primary bg-white dark:text-white">
                  <div className="col-span-4 pl-14">Share link on</div>
                  <div className="ml-5" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                  </div>
                </h2>
                <hr className="py-4 dark:bg-dbeats-dark-alt" />
                <div>
                  <Container className="px-12 pb-4 dark:bg-dbeats-dark-alt">
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
                <hr className="py-2 dark:bg-dbeats-dark-alt" />
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Profile;
