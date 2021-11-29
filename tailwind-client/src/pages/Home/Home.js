import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import personImg from '../../assets/images/profile.svg';
import PlayBackCard from './Cards/PlayBackCard';
import LiveCard from './Cards/LiveCard';
import ResponsiveCarousel from './Cards/HomeSlider';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../lotties/gamers.json';

const Home = () => {
  const [activeStreams, setActiveStreams] = useState([]);
  const [slides, setSlides] = useState([]);
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  const [arrayData, setArrayData] = useState([]);

  const user = JSON.parse(window.localStorage.getItem('user'));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const recommend_channels = [
    { name: 'shroud' },
    { name: 'shroud' },
    { name: 'shroud' },
    { name: 'shroud' },
    { name: 'shroud' },
  ];

  useEffect(() => {
    let slidesValue = [];
    axios.get(`${process.env.REACT_APP_SERVER_URL}/get_activeusers`).then(async (repos) => {
      for (let i = 0; i < repos.data.length; i++) {
        await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/user/get_user_by_id/${repos.data[i].id}`)
          .then((value) => {
            if (value.data !== '') setActiveStreams((prevState) => [...prevState, value.data]);

            if (i < 5) {
              slidesValue.push(value.data);
            }
          });
      }
      setSlides(slidesValue);
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const fileRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
    for (let i = 0; i < fileRes.data.array.length; i++) {
      if (fileRes.data.array[i].videos && fileRes.data.array[i].videos.length > 0) {
        if (user ? fileRes.data.array[i].username !== user.username : true)
          setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
      }
    }
  };

  return (
    <>
      <div className={`${darkMode && 'dark'} `}>
        <div id="outer-container" className="h-full ">
          <div
            id="page-wrap"
            className={`${darkMode && 'dark'} grid 2xl:pl-16 lg:pl-14 grid-cols-6`}
          >
            <div
              id="recommended_channel"
              className="w-full  pt-8 h-full lg:col-span-1 hidden  lg:block sm:hidden mt-4  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary"
            >
              <div className="2xl:px-8 2xl:pt-10 lg:px-3 lg:pt-6 ">
                <h5 className="font-semibold 2xl:text-base lg:text-xs dark:text-gray-200">
                  {' '}
                  RECOMMENDED CHANNELS
                </h5>
                {recommend_channels.map((channel, i) => {
                  return (
                    <div key={i} className="flex pb-2 pt-2">
                      <img
                        src={personImg}
                        alt=""
                        className="2xl:w-14 2xl:h-14 lg:h-10 lg:w-10 rounded-full mr-2 bg-gray-100 self-center"
                      />
                      <div>
                        <span className="font-semibold 2xl:text-sm lg:text-xs dark:text-gray-200">
                          {' '}
                          {channel.name}{' '}
                        </span>
                        <br />
                        <span className="text-gray-400 2xl:text-sm lg:text-xs">
                          {' '}
                          Counter Strike...{' '}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* {classes.other_videos} */}
            <div className="flex flex-col justify-between col-span-6 h-screen lg:col-span-5 h-full  pt-5 bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-secondary">
              <div>
                <div id="display_videos" className="lg:my-5 lg:px-4 px-0 my-0  h-max">
                  <div className=" lg:px-4 h-max">
                    {slides.length > 2 ? (
                      <div className="pt-4">
                        <ResponsiveCarousel slides={slides} autoplay={false} />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="lg:mt-10 2xl:px-4 ">
                  <div id="display_playback_videos" className="mt-10 2xl:px-4 px-1 ">
                    <div>
                      <h4 className=" font-bold mt-10 2xl:pb-4 lg:pb-2">
                        {activeStreams ? (
                          (activeStreams.length <= 2 && activeStreams.length !== 0) ||
                          activeStreams.length > 5 ? (
                            <>
                              <p className="mb-3 w-max mx-auto   self-center text-center  drop-shadow text-2xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-white dark:to-gray-800">
                                <span className=" bg-red-900 animate-ping mr-2 rounded-full   inline-block  h-2 w-2 self-center ">
                                  &middot;
                                </span>
                                LIVE
                              </p>
                              <div className="">
                                <Carousel cols={5}>
                                  {activeStreams.map((liveUser, i) => {
                                    if (activeStreams.length <= 2 || i >= 5) {
                                      return (
                                        <Carousel.Item key={i}>
                                          <LiveCard
                                            className=""
                                            liveUserData={liveUser}
                                            username={liveUser.username}
                                          />
                                        </Carousel.Item>
                                      );
                                    }
                                    return 0;
                                  })}
                                </Carousel>
                              </div>{' '}
                            </>
                          ) : null
                        ) : (
                          false
                        )}
                      </h4>
                    </div>
                  </div>
                  <div id="display_playback_videos" className="2xl:px-4 lg:px-3 px-1">
                    <div className="  ">
                      <h4 className=" font-bold 2xl:pl-5 pl-3 2xl:pt-3 lg:pt-0 pt-3 pb-4 dark:text-gray-200">
                        Trending
                      </h4>
                      <div className="">
                        <Carousel cols={4}>
                          {arrayData.map((playbackUser, i) => {
                            return (
                              <Carousel.Item key={i}>
                                <PlayBackCard darkMode={darkMode} playbackUserData={playbackUser} />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-0">
                <div className="LottieButton opacity-10 mb-5 mt-10">
                  <Lottie options={defaultOptions} height={200} width={300} />
                </div>
                <h3 className="text-black   capitalize text-center proxima-reg dark:text-white dark:text-opacity-20">
                  Developed by Creators for the Creators on a Decentralised Web
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
