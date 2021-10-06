import React, { useState, useEffect } from 'react';
//import classes from './Home.module.css';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import personImg from '../../assets/images/profile.svg';
//import { Avatar } from "@material-ui/core";
import PlayBackCard from './PlayBackCard';
import LiveCard from './LiveCard';
import Skeleton from '@material-ui/lab/Skeleton';
import ResponsiveCarousel from './HomeSlider';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../lotties/gamers.json';
import Pinned_Panel from '../Subscribe_Panel/Pinned_Panel';

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
            //console.log(repos.data[i].id," user :" ,value)
            if (value.data !== '') setActiveStreams((prevState) => [...prevState, value.data]);

            if (i < 5) {
              slidesValue.push(value.data);
            }
          });
      }
      setSlides(slidesValue);
    });
    fetchData();
  }, []);

  console.log(slides);

  const fetchData = async () => {
    const fileRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
    for (let i = 0; i < fileRes.data.array.length; i++) {
      if (fileRes.data.array[i].videos) {
        if (user ? fileRes.data.array[i].username !== user.username : true)
          setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
      }
    }
    //console.log(fileRes, "Hi");
  };
  //console.log(arrayData, "hello");

  return (
    <>
      <div className={`${darkMode && 'dark'} `}>
        <div id="outer-container" className="h-100">
          <div id="page-wrap" className={`${darkMode && 'dark'} grid lg:pl-16 grid-cols-6`}>
            <Pinned_Panel />
            <div
              id="recommended_channel"
              className="w-100  pt-8 h-full lg:col-span-1 hidden  lg:block sm:hidden  bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary"
            >
              <div className="px-8 pt-10 ">
                <h5 className="font-semibold text-base dark:text-gray-200">
                  {' '}
                  RECOMMENDED CHANNELS
                </h5>
                {recommend_channels.map((channel, i) => {
                  return (
                    <div key={i} className="flex pb-2 pt-2">
                      <img
                        src={personImg}
                        alt=""
                        className="w-14 h-14 rounded-full mr-2 bg-gray-100"
                      />
                      <div>
                        <span className="font-semibold text-sm dark:text-gray-200">
                          {' '}
                          {channel.name}{' '}
                        </span>
                        <br />
                        <span className="text-gray-400 text-sm"> Counter Strike... </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* {classes.other_videos} */}
            <div className="col-span-6 lg:col-span-5 h-full  pt-8 bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-secondary">
              <div id="display_videos" className="lg:my-6 lg:px-4 px-0 my-0  h-max">
                <div className="pt-4 lg:px-4 h-max">
                  {slides.length > 2 ? (
                    <ResponsiveCarousel slides={slides} autoplay={false} />
                  ) : (
                    <>
                      <Skeleton animation="wave" variant="rect" height="35vh" />
                      <h4 className="font-bold py-2 dark:text-gray-200" align="center">
                        Waiting for Live Streamers
                      </h4>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-10 px-4 ">
                <div id="display_playback_videos" className="mt-10 px-4 ">
                  <div>
                    <h4 className=" font-bold pl-2 mt-10 pb-4 ">
                      {activeStreams ? (
                        (activeStreams.length <= 2 && activeStreams.length != 0) ||
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
                                })}
                              </Carousel>
                            </div>{' '}
                          </>
                        ) : (
                          <></>
                        )
                      ) : (
                        false
                      )}
                    </h4>
                  </div>
                </div>
                <div id="display_playback_videos" className="px-4 ">
                  <div className="  ">
                    <h4 className=" font-bold pl-5 pt-3 pb-4 dark:text-gray-200">Trending</h4>
                    <div className="">
                      <Carousel cols={4}>
                        {arrayData.map((playbackUser, i) => {
                          return (
                            <Carousel.Item key={i}>
                              <PlayBackCard playbackUserData={playbackUser} index={0} />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                  </div>
                </div>
                <div className="opacity-10 mb-5 mt-10">
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
