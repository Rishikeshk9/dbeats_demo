import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import axios from "axios";
import { Carousel as LiveStreamVideos } from "3d-react-carousal";
import Carousel from "react-grid-carousel";
import personImg from "../../assets/images/profile.svg";
//import { Avatar } from "@material-ui/core";
import PlayBackCard from "./PlayBackCard";
import LiveCard from "./LiveCard";
import ReactPlayer from "react-player";
import Skeleton from "@material-ui/lab/Skeleton";
import ResponsiveCarousel from "./HomeSlider";

const Home = (props) => {
  const [activeStreams, setActiveStreams] = useState([]);
  const [slides, setSlides] = useState([]);

  const [arrayData, setArrayData] = useState([]);

  const user = JSON.parse(window.localStorage.getItem("user"));

  const recommend_channels = [
    { name: "shroud" },
    { name: "shroud" },
    { name: "shroud" },
    { name: "shroud" },
    { name: "shroud" },
  ];

  const CarouselStreams = ({ stream_data, userData }) => {
    const [playing, setPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const handleMouseMove = () => {
      setPlaying(true);
      setShowControls(true);
    };

    const hanldeMouseLeave = () => {
      setPlaying(false);
      setShowControls(false);
    };

    return (
      <div className="bg-white w-full h-70 md:h-70 flex   ">
        <span className="fixed bg-red-600 text-white px-1     mx-2 my-2 rounded-sm font-semibold z-50">
          {" "}
          Live{" "}
        </span>
        <ReactPlayer
          width="100%"
          height="100%  "
          playing={playing}
          muted={false}
          volume={0.3}
          url={`https://cdn.livepeer.com/hls/${stream_data.playbackId}/index.m3u8`}
          controls={showControls}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
        <div className="h-70 md:h-60 px-5 py-3 md:px-1 md:py-2 md:text-md">
          <div className="flex">
            <img
              src="https://static-cdn.jtvnw.net/jtv_user_pictures/feba598d-00c2-499b-829d-66429f273afa-profile_image-70x70.png"
              className="h-15 md:h-10 w-15 md:w-10 my-auto"
              alt="stream_img"
            ></img>
            <p className=" my-auto font-bold text-xl align-middle ">
              {stream_data.name}
            </p>
          </div>
          <p>Streamer Id : {stream_data.id}</p>
          <p>Streamer Key : {stream_data.streamKey}</p>
          <button
            className="shadow-sm px-3 py-2 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold "
            onClick={() => {
              window.location.href = `/public/${userData.username}`;
            }}
          >
            Watch Stream
          </button>
        </div>
      </div>
    );
  };
  //console.log(activeStreams);

  useEffect(() => {
    let slidesValue = [];
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get_activeusers`)
      .then(async (repos) => {
        for (let i = 0; i < repos.data.length; i++) {
          await axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}/user/get_user_by_id/${repos.data[i].id}`
            )
            .then((value) => {
              //console.log(repos.data[i].id," user :" ,value)
              if (value.data !== "")
                setActiveStreams((prevState) => [...prevState, value.data]);

              if (i < 5) {
                slidesValue.push(value.data);
              }
            });
        }
        setSlides(slidesValue);
      });
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div
              id="recommended_channel"
              className="w-100 bg-gray-100 lg:block sm:hidden"
            >
              <div className="px-3 pt-4">
                <h5 className="font-semibold text-base">
                  {" "}
                  RECOMMENDED CHANNELS ...
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
                        <span className="font-semibold text-sm">
                          {" "}
                          {channel.name}{" "}
                        </span>
                        <br />
                        <span className="text-gray-400 text-sm">
                          {" "}
                          Counter Strike...{" "}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={classes.other_videos}>
              <div id="display_videos" className="my-6 px-4">
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
              <div>
                <div id="display_playback_videos" className="mt-1 px-4 ">
                  <div>
                    <h4 className=" font-bold pl-2 mt-10 pb-4 ">
                      {activeStreams.length > 0 ? (
                        <div>
                          <span className="animate-ping bg-red-900 rounded-full">
                            &nbsp;
                          </span>
                          &nbsp; Live Now
                        </div>
                      ) : (
                        <></>
                      )}
                    </h4>
                    <div className="">
                      <Carousel cols={5}>
                        {activeStreams.map((liveUser, i) => {
                          if (i <= 2 || i >= 5) {
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
                              <PlayBackCard
                                playbackUserData={playbackUser}
                                index={0}
                              />
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
