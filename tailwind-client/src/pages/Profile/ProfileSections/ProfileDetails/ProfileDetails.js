import { Tab } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-grid-carousel';
import person from '../../../../assets/images/profile.svg';
import background from '../../../../assets/images/wallpaper.jpg';
import {
  UploadCoverImageModal,
  UploadProfileImageModal,
} from '../../../../component/Modals/ImageUploadModal/ImageUploadModal';
import CarouselCard from '../../Cards/CarouselCard';
import PlaylistCard from '../../Cards/PlaylistCard';
import ReactionCard from '../../Cards/ReactionCard';
import TrackCard from '../../Cards/TrackCard';

const ProfileDetails = ({ setSharable_data, tabname, urlUsername, user, setShow, darkMode }) => {
  const [pinnedData, setPinnedData] = useState([]);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [privateUser, setPrivate] = useState(true);
  const [loader, setLoader] = useState(true);

  const handleShow = () => setShow(true);

  const [showUploadCoverImage, setShowUploadCoverImage] = useState(false);
  const [showUploadProfileImage, setShowUploadProfileImage] = useState(false);
  const handleCloseImage = () => {
    setShowUploadCoverImage(false);
    setShowUploadProfileImage(false);
  };

  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [buttonText, setButtonText] = useState('Subscribe');

  const myData = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    let value = JSON.parse(window.localStorage.getItem('user'));
    let tabno = tabname;
    switch (tabno) {
      case 'announcements':
        setTabIndex(0);
        break;
      case 'videos':
        setTabIndex(1);
        break;
      case 'tracks':
        setTabIndex(2);
        break;
      case 'playlists':
        setTabIndex(3);
        break;
      case 'reposts':
        setTabIndex(4);
        break;
      case 'subscribed_channels':
        setTabIndex(5);
        break;
      default:
        setTabIndex(0);
    }
    // //console.log(value);
    if (value) {
      if (value.username === urlUsername) {
        setSharable_data(`https://dbeats.live/profile/${value.username}`);
        setPrivate(true);
        setFollowers(value.follower_count.length);
        setFollowing(value.followee_count.length);
        if (value.pinned) {
          setPinnedData(value.pinned);
        }

        if (value.cover_image && value.cover_image !== '') {
          setCoverImage(value.cover_image);
        } else {
          setCoverImage(background);
        }

        if (value.profile_image && value.profile_image !== '') {
          setProfileImage(value.profile_image);
        } else {
          console.log('person', person);
          setProfileImage(person);
        }
      } else {
        get_User();
        setPrivate(false);
      }
    } else {
      get_User();
      setPrivate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_User = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${urlUsername}`).then((value) => {
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
      if (value.data.cover_image && value.data.cover_image !== '') {
        setCoverImage(value.data.cover_image);
      } else {
        setCoverImage(background);
      }

      if (value.data.profile_image && value.data.profile_image !== '') {
        setProfileImage(value.data.profile_image);
      } else {
        console.log('person', person);
        setProfileImage(person);
      }
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const trackFollowers = () => {
    if (buttonText === 'Login to Subscribe') {
      window.location.href = '/signup';
    }
    //console.log(followers);
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
            //console.log(response);
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
      .then(() => {
        let value = [];
        for (let i = 0; i < pinnedData.length; i++) {
          if (pinnedData[i] !== pinnedUser) {
            value.push(pinnedData[i]);
          }
        }
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
      .then(() => {
        setPinnedData((prevData) => [...prevData, pinnedUser]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const NavTabs = ['Posts', 'Videos', 'Tracks', 'Playlists', 'Reactions', 'Subscribed Channels'];

  const NavTabsTitle = ({ text }) => {
    if (text === 'Subscribed Channels') {
      if (!privateUser) {
        return <></>;
      }
    }
    return (
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
        {text}
      </Tab>
    );
  };

  return (
    <div className={`${darkMode && 'dark'} px-5 h-max lg:col-span-5 col-span-6 w-full mt-16`}>
      <div id="display_details" className="  pt-3 h-full">
        <div className="bg-white dark:bg-dbeats-dark-primary pb-3 ">
          {privateUser ? (
            <div
              className="ml-2 mt-2 absolute dark:bg-dbeats-dark-alt dark:hover:bg-dbeats-dark hover:bg-white
              hover:text-dbeats-light dark:hover:text-white rounded-full z-2 text-white dark:text-gray-400"
            >
              <i
                className="fas fa-pen p-3
                cursor-pointer"
                onClick={() => setShowUploadCoverImage(true)}
              ></i>
            </div>
          ) : (
            false
          )}
          <div className="block ">
            <img src={coverImage} alt="backgroundImg" className="lg:h-88 h-56 w-full " />
          </div>
          <div className="w-full ">
            <div className="w-full flex flex-col lg:flex-row lg:-mt-28 -mt-20 lg:ml-5 ml-0">
              <div className="lg:w-56 w-full flex justify-center z-1">
                <div
                  className="px-1 py-1 shadow-sm 2xl:w-44 2xl:h-44 lg:w-36 
                lg:h-36 h-28 w-28 bg-white rounded-full 
                dark:bg-dbeats-dark-primary overflow-hidden"
                >
                  <img
                    src={profileImage}
                    alt=""
                    className="relative h-full w-full  align-middle items-center  rounded-full "
                  />
                  {privateUser ? (
                    <div className="flex justify-end ">
                      <div
                        className="absolute dark:bg-dbeats-dark-alt dark:hover:bg-dbeats-dark dark:text-gray-400 hover:bg-gray-200
                        hover:text-dbeats-light dark:hover:text-white text-dbeats-light bg-white  rounded-full z-2 -mt-8 mr-2"
                      >
                        <i
                          className="fas fa-pen p-2.5 
                     cursor-pointer"
                          onClick={() => setShowUploadProfileImage(true)}
                        ></i>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col ml-3 mr-5 z-1 ">
                <div className="flex flex-col lg:flex-row justify-between  mt-14 text-gray-400 lg:px-10 px-2 rounded-tl-lg  dark:bg-dbeats-dark-primary bg-white">
                  <div className="dark:text-white  text-dbeats-dark-alt py-4">
                    <div className="flex w-max lg:pt-0 items-center ">
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
                        className="no-underline border text-dbeats-dark-alt 
                        cursor-pointer dark:border-white border-1  dark:text-blue-50 
                        hover:bg-dbeats-light hover:text-white 
                        dark:hover:text-white rounded font-bold mr-1 
                        flex self-center   py-1 px-3"
                      >
                        <i className="fas fa-share-alt self-center mr-2 "></i> SHARE
                      </button>
                    </div>
                    <span className="font-semibold">@{user.username}</span>
                  </div>

                  <div className="lg:grid lg:grid-flow-rows lg:grid-cols-3  font-bold text-xl text-gray-20 lg:gap-4 flex justify-between items-center">
                    <div className="mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center items-center">
                      <div className=" w-full mr-2 flex justify-center">
                        {user.videos ? user.videos.length : 0}{' '}
                      </div>
                      <div className="text-sm">VIDEOS</div>
                    </div>
                    <div className="mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center items-center">
                      <div className=" w-full mr-2 flex justify-center ">
                        {/*{user.subscribers ? <>{user.subscribers.length}</> : 0}{" "}*/}
                        {followers}{' '}
                      </div>
                      <div className="text-sm">FOLLOWERS</div>
                    </div>
                    <div className="mx-auto lg:px-4 px-2 flex flex-col lg:flex-row justify-center items-center">
                      <div className=" w-full mr-2 flex justify-center ">
                        {/*{user.subscribed ? <>{user.subscribed.length}</> : 0}{" "}*/}
                        {following}{' '}
                      </div>
                      <div className="text-sm">FOLLOWING</div>
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
              {NavTabs.map((tab, idx) => {
                return <NavTabsTitle text={tab} key={idx} />;
              })}
            </Tab.List>

            <Tab.Panels className="dark:bg-dbeats-dark-alt w-full h-max pb-10">
              <Tab.Panel className="">
                <div className="px-5 pt-10">
                  <p className="text-lg dark:text-white">No Posts till now</p>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="px-5 pt-10">
                  {user.videos && user.videos.length > 0 ? (
                    <div>
                      {user.videos.map((playbackUser, i) => {
                        ////console.log(playbackUser)
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
                    <p className="text-lg dark:text-white">No Videos till now</p>
                  )}
                </div>
              </Tab.Panel>

              <Tab.Panel className="">
                <div className="px-5 pt-10">
                  {user.tracks && user.tracks.length > 0 ? (
                    <div className="w-full">
                      {user.tracks.map((track, i) => {
                        ////console.log(playbackUser)
                        return (
                          <div key={i} className="w-full">
                            <TrackCard track={track} index={i} username={user.username} />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-lg dark:text-white">No Tracks till now</p>
                  )}
                </div>
              </Tab.Panel>

              <Tab.Panel className="">
                <div className="px-5 pt-10">
                  {user.my_playlists && user.my_playlists.length > 0 ? (
                    <div>
                      {user.my_playlists.map((playlist, i) => {
                        ////console.log(playbackUser)
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
                    <p className="text-lg dark:text-white">No Existing PlayLists</p>
                  )}
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="px-5 pt-10">
                  {user.your_reactions.length > 0 ? (
                    <div>
                      {user.your_reactions.map((playbackUser, i) => {
                        ////console.log(playbackUser)
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
                    <p className="text-lg dark:text-white">No Reactions till now</p>
                  )}
                </div>
              </Tab.Panel>

              {privateUser ? (
                <Tab.Panel className="">
                  <div className="px-5 pt-10 grid grid-cols-4 grid-flow-row ">
                    {user.followee_count ? (
                      <div>
                        {user.followee_count.map((following, i) => {
                          ////console.log(playbackUser)
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
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <UploadCoverImageModal
        show={showUploadCoverImage}
        handleClose={handleCloseImage}
        setCoverImage={setCoverImage}
        coverImage={coverImage}
        loader={loader}
        setLoader={setLoader}
        darkMode={darkMode}
      />
      <UploadProfileImageModal
        show={showUploadProfileImage}
        handleClose={handleCloseImage}
        setProfileImage={setProfileImage}
        loader={loader}
        setLoader={setLoader}
        darkMode={darkMode}
      />
    </div>
  );
};

export default ProfileDetails;
