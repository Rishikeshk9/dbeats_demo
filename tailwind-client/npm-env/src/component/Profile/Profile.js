import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselCard from './Cards/CarouselCard';
import ReactionCard from './Cards/ReactionCard';
import person from '../../assets/images/profile.svg';
import background from '../../assets/images/wallpaper.jpg';
import ChannelSection from './ChannelSection';
import Carousel from 'react-grid-carousel';
import PlaylistCard from './Cards/PlaylistCard';
import { useSelector } from 'react-redux';
import TrackCard from './Cards/TrackCard';
import { Tab } from '@headlessui/react';
import { ShareModal } from '../Modals/ShareModal/ShareModal';

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

  const [buttonText, setButtonText] = useState('Subscribe');

  const text = 'Copy To Clipboard';
  const [copybuttonText, setCopyButtonText] = useState(text);

  const [tabIndex, setTabIndex] = useState(0);

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
          if (myData) {
            if (value.data.follower_count[i] === myData.username) {
              setButtonText('Unsubscribe');
              break;
            }
          } else {
            setButtonText('Login to Subscribe');
            break;
          }
        }
        setSharable_data(`https://dbeats.live/profile/${value.data.username}`);
        setFollowers(value.data.follower_count.length);
        setFollowing(value.data.followee_count.length);
      });
  };

  //console.log(user);
  const trackFollowers = () => {
    if (buttonText === 'Login to Subscribe') {
      window.location.href = '/login';
    }
    console.log(followers);
    const followData = {
      following: `${user.username}`,
      follower: `${myData.username}`,
    };

    if (buttonText === 'Subscribe') {
      setButtonText('Unsubscribe');
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
      setButtonText('Subscribe');
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
  // console.log(myData);

  useEffect(async () => {
    let value = JSON.parse(window.localStorage.getItem('user'));
    let tabname = props.match.params.tab;
    switch (tabname) {
      case 'announcements':
        setTabIndex(0);
        break;
      case 'subscribed_channels':
        setTabIndex(1);
        break;
      case 'videos':
        setTabIndex(2);
        break;
      case 'albums':
        setTabIndex(3);
        break;
      case 'playlists':
        setTabIndex(4);
        break;
      case 'reposts':
        setTabIndex(5);
        break;
      default:
        setTabIndex(0);
    }
    // console.log(value);
    if (value) {
      if (value.username === props.match.params.username) {
        setUser(value);
        setSharable_data(`https://dbeats.live/profile/${value.username}`);
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
    } else {
      get_User();
      setPrivate(false);
    }
    let nftMedata = null;
    //-------------------------------------------------------Fetches all the NFT's of the user on Dbeats-------------------------------------------------------
    await axios({
      method: 'GET',
      url: 'https://api.nftport.xyz/v0/accounts/0x5d55407a341d96418cEDa98E06C244a502fC9572?chain=polygon&include=metadata',
      // url: `https://api.covalenthq.com/v1/137/address/0x5d55407a341d96418cEDa98E06C244a502fC9572/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b5245f3db18d4a2d999fef65fc`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'ad092d8e-feb0-4430-92f7-1fa501b83bec',
      },
    })
      .then((response) => {
        // console.log(response);
        nftMedata = response.data.nfts;
      })
      .catch(function (error) {
        console.log(error);
      });
    //-------------------------------------------------------XXXXXXXXXXXXXXXXXENDXXXXXXXXXXXXXXXXXXXX---------------------------------------------------------
    console.log(nftMedata);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copybuttonText]);

  return (
    <>
      {user ? (
        <div>
          <div id="outer-container" className="">
            <div id="page-wrap" className={`${darkMode && 'dark'} grid lg:pl-18 grid-cols-6`}>
              <ChannelSection privateUser={privateUser} user={user} />
              <div className="px-5 h-max lg:col-span-5 col-span-6 w-full mt-16">
                <div id="display_details" className="  pt-3 h-full">
                  <div className="bg-white dark:bg-dbeats-dark-primary pb-3 ">
                    {privateUser ? (
                      <i className="fas fa-edit absolute ml-2 mt-2 text-white p-3 rounded-full hover:bg-dbeats-dark-alt hover:opacity-100 opacity-25 z-30 cursor-pointer"></i>
                    ) : (
                      false
                    )}
                    <div className="block">
                      <img src={background} className="lg:h-88 h-56 w-full" />
                    </div>
                    <div className="w-full">
                      <div className="w-full flex flex-col lg:flex-row lg:-mt-28 -mt-20 lg:ml-5 ml-0">
                        <div className="lg:w-56 w-full flex justify-center ">
                          <div className="px-1 py-1 shadow-sm lg:w-44 lg:h-44 h-28 w-28 bg-white rounded-full   dark:bg-dbeats-dark-primary">
                            <img
                              src={person}
                              alt=""
                              className="relative lg:w-42 lg:h-42  align-middle items-center  rounded-full "
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col ml-3 mr-5 ">
                          <div className="text-white pb-5">
                            <div className="flex w-max pt-2 lg:pt-0">
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
                          <div className="flex text-gray-400 py-3   lg:pt-12 pt-5 dark:bg-dbeats-dark-primary">
                            <div className="lg:grid lg:grid-flow-rows lg:grid-cols-5   lg:gap-4 flex justify-between">
                              <div className="font-bold mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center align-center">
                                <div className="font-bold text-lg text-gray-700 w-full flex justify-center mr-2 ">
                                  {user.videos ? user.videos.length : 0}{' '}
                                </div>
                                <div className="mt-0.5">VIDEOS</div>
                              </div>
                              <div className="font-bold mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center align-center">
                                <div className="font-bold text-lg text-gray-700 w-full flex justify-center mr-2 ">
                                  {/*{user.subscribers ? <>{user.subscribers.length}</> : 0}{" "}*/}
                                  {followers}{' '}
                                </div>
                                <div className="mt-0.5">FOLLOWERS</div>
                              </div>
                              <div className="font-bold mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center align-center">
                                <div className="font-bold text-lg text-gray-700 w-full flex justify-center mr-2 ">
                                  {/*{user.subscribed ? <>{user.subscribed.length}</> : 0}{" "}*/}
                                  {following}{' '}
                                </div>
                                <div className="mt-0.5">FOLLOWING</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full relative mb-20 ">
                    <Tab.Group defaultIndex={tabIndex}>
                      <Tab.List className="flex px-1  space-x-1 bg-white lg:flex-nowrap flex-wrap dark:bg-dbeats-dark-primary ">
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
                          POSTS
                        </Tab>
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
                          TRACKS
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
                          REACTIONS
                        </Tab>
                      </Tab.List>

                      <Tab.Panels className="dark:bg-dbeats-dark-alt w-full h-max pb-10">
                        <Tab.Panel className="">
                          <div className="px-5 pt-10 dark:bg-dbeats-dark-alt"></div>
                        </Tab.Panel>
                        {privateUser ? (
                          <Tab.Panel className="">
                            <div className="px-5 pt-10 grid grid-cols-4 grid-flow-row ">
                              {user.followee_count ? (
                                <div>
                                  {user.followee_count.map((following, i) => {
                                    //console.log(playbackUser)
                                    return (
                                      <div
                                        key={i}
                                        className="flex lg:text-lg text-md shadow px-10 w-max lg:w-full  my-5 py-2 dark:bg-dbeats-dark-primary dark:text-gray-100"
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
                            {user.tracks ? (
                              <div className="w-full">
                                {user.tracks.map((track, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i} className="w-full">
                                      <TrackCard track={track} index={i} username={user.username} />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Tracks till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.my_playlists ? (
                              <div>
                                {user.my_playlists.map((playlist, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <>
                                      <div key={i} className="">
                                        <h2 className="dark:text-white text-2xl ml-5 mb-3">
                                          {playlist.playlistname}
                                        </h2>
                                        <div>
                                          <Carousel cols={4}>
                                            {playlist.playlistdata.map((data, i) => {
                                              return (
                                                <Carousel.Item key={i}>
                                                  <PlaylistCard playlistData={data} />
                                                </Carousel.Item>
                                              );
                                            })}
                                          </Carousel>
                                        </div>
                                      </div>
                                      <hr className="my-7" />
                                    </>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Existing PlayLists</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div className="px-5 pt-5">
                            {user.your_reactions.length > 0 ? (
                              <div>
                                {user.your_reactions.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i} className="">
                                      <ReactionCard
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
                              <p>No Reactions till now</p>
                            )}
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>

            <ShareModal
              show={show}
              handleClose={handleClose}
              sharable_data={sharable_data}
              copybuttonText={copybuttonText}
              setCopyButtonText={setCopyButtonText}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Profile;
