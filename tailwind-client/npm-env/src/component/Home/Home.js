import React, { useState, useEffect } from 'react';
import classes from './Home.module.css';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import personImg from '../../assets/images/profile.svg';
//import { Avatar } from "@material-ui/core";
import PlayBackCard from './PlayBackCard';
import LiveCard from './LiveCard';
import Skeleton from '@material-ui/lab/Skeleton';
import ResponsiveCarousel from './HomeSlider';

const Home = () => {
  const [activeStreams, setActiveStreams] = useState([]);
  const [slides, setSlides] = useState([]);

  const [arrayData, setArrayData] = useState([]);

  const user = JSON.parse(window.localStorage.getItem('user'));

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
      <div>
        <div id="outer-container" className="h-100">
          <main id="page-wrap" className={classes.main_homepage_body}>
            <div id="recommended_channel" className="w-100 bg-gray-100 lg:block sm:hidden">
              <div className="px-3 pt-4">
                <h5 className="font-semibold text-base"> RECOMMENDED CHANNELS ...</h5>
                {recommend_channels.map((channel, i) => {
                  return (
                    <div key={i} className="flex pb-2 pt-2">
                      <img
                        src={personImg}
                        alt=""
                        className="w-14 h-14 rounded-full mr-2 bg-gray-100"
                      />
                      <div>
                        <span className="font-semibold text-sm"> {channel.name} </span>
                        <br />
                        <span className="text-gray-400 text-sm"> Counter Strike... </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={classes.other_videos}>
              <div id="display_videos" className="my-6 px-4 h-max">
                <div className="pt-4 px-4 h-max">
                  {slides.length > 2 ? (
                    <ResponsiveCarousel slides={slides} autoplay={false} />
                  ) : (
                    <>
                      <Skeleton animation="wave" variant="rect" height="35vh" />
                      <h4 className="font-bold py-2" align="center">
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
                      {activeStreams.length <= 2 || activeStreams.length > 5 ? (
                        <div>
                          <span className="animate-ping bg-red-900 rounded-full">&nbsp;</span>
                          &nbsp; Live Now
                        </div>
                      ) : (
                        <></>
                      )}
                    </h4>
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
                    </div>
                  </div>
                </div>
                <div id="display_playback_videos" className="px-4 ">
                  <div className="  ">
                    <h4 className=" font-bold pl-5 pt-3 pb-4">Trending</h4>
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
