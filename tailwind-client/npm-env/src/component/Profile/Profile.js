import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselCard from './CarouselCard';
import person from '../../assets/images/profile.svg';
import background from '../../assets/images/wallpaper.jpg';

import Modal from 'react-awesome-modal';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { RadioGroup } from '@headlessui/react';

import { Tab } from '@headlessui/react';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [privateUser, setPrivate] = useState(true);

  const [sharable_data, setSharable_data] = useState('');

  const [pinnedData, setPinnedData] = useState([]);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [show, setShow] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowChannelModal = () => setShowChannelModal(true);
  const handleCloseChannelModal = () => setShowChannelModal(false);

  const [buttonText, setButtonText] = useState('SUBSCRIBE');

  const myData = JSON.parse(window.localStorage.getItem('user'));

  const server_channels = [
    { name: 'Voice-Channel', type: 'voice' },
    { name: 'Text-Channel', type: 'text' },
    { name: 'Store', type: 'store' },
  ];

  const channels = [
    {
      name: 'Voice Channel',
      ram: 'Host a live voice chat room',
    },
    {
      name: 'Text Channel',
      ram: 'Post Images, GIFs, Stickers, Links & everything else',
    },
    {
      name: 'Stage',
      ram: 'Go Live! host events & Podcast with your audience',
    },
  ];

  const [selected, setSelected] = useState(channels[0]);

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
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  return (
    <>
      {user ? (
        <div>
          <div id="outer-container" className="h-full">
            <div
              id="page-wrap"
              className={`${darkMode && 'dark'} grid lg:pl-18 grid-cols-6 h-full`}
            >
              <div
                id="recommended_channel"
                className="w-100  pt-8 h-full lg:col-span-1 hidden  lg:block sm:hidden mt-4  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary"
              >
                <div className="relative">
                  <img src={background}></img>
                  {privateUser ? (
                    <i className="fas fa-edit absolute right-2 bottom-2 text-white p-3 rounded-full hover:bg-dbeats-dark-alt hover:opacity-100 opacity-25 cursor-pointer"></i>
                  ) : (
                    false
                  )}{' '}
                </div>

                <div className="px-5 pt-10 ">
                  <h5 className="font-semibold text-base dark:text-gray-200 w-full  relative">
                    {' '}
                    {user.name}&apos;s Channels
                    {privateUser ? (
                      <i
                        className="fas fa-plus mr-2 absolute right-0 cursor-pointer rounded p-2 -top-1 hover:bg-dbeats-dark-primary"
                        onClick={handleShowChannelModal}
                      ></i>
                    ) : (
                      false
                    )}
                  </h5>

                  {server_channels.map((channel, i) => {
                    return (
                      <div key={i} className="  pb-2 pt-2">
                        <div>
                          <div className="font-semibold cursor-pointer text-sm dark:text-gray-200 w-full justify-between self-center hover:bg-dbeats-dark-primary rounded p-2 relative">
                            {' '}
                            {channel.type == 'text' ? <i className="fas fa-hashtag mr-2"></i> : ''}
                            {channel.type == 'voice' ? (
                              <i className="fas fa-headphones-alt mr-2"></i>
                            ) : (
                              ''
                            )}
                            {channel.type == 'store' ? <i className="fas fa-store mr-2 "></i> : ''}
                            {channel.name}
                            <i className="fas fa-user-plus ml-5 absolute right-3 self-center text-center mt-1"></i>
                          </div>

                          <span className="text-gray-400 text-sm cursor-pointer ml-5 hover:text-white">
                            {' '}
                            Counter Strike...{' '}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex col-span-6 lg:col-span-5 h-full">
                <div id="display_details" className="  pt-3 h-full">
                  <div className="bg-white pb-3 ">
                    <div className="block">
                      <img src={background} style={{ width: '100%', height: '22rem' }} />
                    </div>
                    <div className="w-100">
                      <div className="w-100 flex -mt-28 ml-5">
                        <div className="w-56 ">
                          <div className="px-1 py-1 shadow-sm w-44 h-44   bg-white rounded-full   dark:bg-dbeats-dark-primary">
                            <img
                              src={person}
                              alt=""
                              className="relative w-42 h-42 align-middle items-center  rounded-full "
                            />
                          </div>
                        </div>
                        <div className="w-100 flex flex-col ml-3 mr-5 ">
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
                  <div className="w-full relative mb-20 ">
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

                      <Tab.Panels className="dark:bg-dbeats-dark-alt w-full ">
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

            <Modal
              visible={showChannelModal}
              className="h-max w-max"
              effect="fadeInUp"
              aria-labelledby="contained-modal-title-vcenter "
              centered
            >
              <div className={`${darkMode && 'dark'} h-max w-max`}>
                <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4  dark:bg-dbeats-dark-alt">
                  <div className="col-span-4 pl-14  text-gray-900 dark:text-gray-100">
                    Create New Channel
                  </div>
                  <div
                    className="ml-5 cursor-pointer text-gray-900 dark:text-gray-100 dark:bg-dbeats-dark-alt"
                    onClick={handleCloseChannelModal}
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </h2>

                <div>
                  <Container className="px-12 pb-4 text-gray-900 dark:text-gray-100 dark:bg-dbeats-dark-alt">
                    <Row>
                      <Col className="flex justify-around align-center">
                        <RadioGroup value={selected} onChange={setSelected}>
                          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                          <div className="space-y-2">
                            {channels.map((plan) => (
                              <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60  '
                                      : 'dark:bg-dbeats-dark-primary '
                                  }
                  ${
                    checked
                      ? 'bg-sky-900 bg-opacity-75 text-gray-900 dark:text-gray-100  '
                      : ' text-gray-900 dark:text-gray-100   '
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                }
                              >
                                {({ checked }) => (
                                  <>
                                    <div className="flex items-center justify-between w-full ">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              checked
                                                ? 'text-white'
                                                : 'text-gray-900 dark:text-gray-100  '
                                            }`}
                                          >
                                            {plan.name}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className={`inline ${
                                              checked ? 'text-sky-100' : 'text-gray-500'
                                            }`}
                                          >
                                            <span>{plan.ram}</span>{' '}
                                          </RadioGroup.Description>
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <CheckIcon className="w-6 h-6" />
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </Col>
                    </Row>
                    <Row>
                      <input
                        className="rounded my-3 w-full ring-0 focus:ring-0 focus:border-dbeats-light dark:bg-dbeats-dark-primary dark:text-white"
                        type="text"
                        placeholder="Enter New Channel Name"
                      ></input>{' '}
                      <i className="fas fa-users mr-2"></i>Subscriber Only
                      <div className="grid grid-cols-3 gap-4 w-full">
                        <button
                          onClick={handleCloseChannelModal}
                          className=" block text-center col-span-1 px-5 w-full  mx-auto p-2 mt-4 mb-2  text-dbeats-light font-semibold rounded-lg border  border-dbeats-light hover:border-white hover:text-white hover:bg-dbeats-dark-secondary transition-all transform hover:scale-95"
                        >
                          Cancel
                        </button>

                        <button className="block shadow-md text-center col-span-2 px-5 w-full  mx-auto p-2 mt-4 mb-2  text-white font-semibold rounded-lg bg-dbeats-light hover:shadow-none transition-all transform hover:scale-95">
                          Create Channel
                        </button>
                      </div>
                    </Row>
                  </Container>
                </div>
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
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default Profile;
