import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import NavBar from "../Navbar/Navbar";
import axios from "axios";
import { Carousel as LiveStreamVideos } from "3d-react-carousal";
import Carousel from "react-grid-carousel";
import personImg from "../../assests/images/person.jpg";
import { Avatar } from "@material-ui/core";
import CarouselCard from "./CarouselCard";
import ReactPlayer from "react-player";
import Skeleton from "@material-ui/lab/Skeleton";


const Home = (props) => {
  
  const [activeStreams, setActiveStreams] = useState([]);
  const [slides, setSlides] = useState([]);

  const [arrayData, setArrayData] = useState([]);

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
      <div className="bg-white w-full h-70 md:h-50 flex">
        <ReactPlayer
          width="100%"
          height="100%"
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
          <button className="shadow-sm px-3 py-2 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold " onClick={() => {
              props.history.push(`/public/${userData.username}`);
            }}>Watch Stream</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setActiveStreams([]);
    setSlides([]);
    setArrayData([]);

    axios.get(`${process.env.REACT_APP_SERVER_URL}/get_activeusers`)
      .then(async (repos) => {
        for (let i = 0; i < repos.data.length; i++) {
          setActiveStreams((prevState) => [...prevState, repos.data[i]]);

          const value = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/get_user_by_id/${repos.data[i].id}`
          );

          setSlides((prevState) => [
            ...prevState,
            <CarouselStreams
              stream_data={repos.data[i]}
              userData={value.data}
            />,
          ]);
        }
      });
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchData = async () => {
    setArrayData([]);
    const fileRes = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/`
    );
    for (let i = 0; i < fileRes.data.array.length; i++) {
      if (fileRes.data.array[i].videos) {
        setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
      }
    }
    //console.log(fileRes, "Hi");
  };
  //console.log(arrayData, "hello");

  return (
    <>
      <div>
        <NavBar />
        <div id="outer-container" style={{ height: "100vh" }}>
          <main id="page-wrap" className={classes.main_homepage_body}>
            <div
              id="recommended_channel"
              className={classes.recommended_channel_section}
            >
              <div className={classes.recommended_title}>
                <h5> RECOMMENDED CHANNELS ...</h5>
                {recommend_channels.map((channel, i) => {
                  return (
                    <div key={i} className={classes.channel_style}>
                      <Avatar
                        className={classes.channel_avatar}
                        alt={channel.name}
                        src={personImg}
                      />
                      <div>
                        <h6> {channel.name} </h6>
                        <span> Counter Strike... </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="display_videos" className={classes.display_videos_section}>
              <div>
                {activeStreams[0] ? (
                  <LiveStreamVideos slides={slides} autoplay={false} />
                ) : (
                  <>
                    <Skeleton animation="wave" variant="rect" height="35vh" />
                    <h4 align="center">Waiting for Live Streamers</h4>
                  </>
                )}
              </div>
              <div>
                <h4 className={classes.display_livestreamers}>
                  {" "}
                  Playback Videos{" "}
                </h4>
                <div className={classes.display_all_streamers}>
                  <Carousel cols={5}>
                    {arrayData.map((playbackUser, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <CarouselCard playbackUserData={playbackUser} index={0}/>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
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
