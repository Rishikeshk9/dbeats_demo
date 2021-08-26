import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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
  //console.log(process.env.REACT_APP_SERVER_URL);

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
      <div className={classes.cards_main_body}>
        <ReactPlayer
          width="100%"
          height="auto"
          playing={playing}
          muted={false}
          volume={0.3}
          url={`https://cdn.livepeer.com/hls/${stream_data.playbackId}/index.m3u8`}
          controls={showControls}
          className={classes.cards_video_body}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
        <div className={classes.cards_text_body}>
          <div className="flex ">
            <img
              src="https://static-cdn.jtvnw.net/jtv_user_pictures/feba598d-00c2-499b-829d-66429f273afa-profile_image-70x70.png"
              className="h-20 w-20  my-auto"
              alt="stream_img"
            ></img>
            <p className=" my-auto font-bold text-xl align-middle ">
              {stream_data.name}
            </p>
          </div>
          <p>Streamer Id : {stream_data.id}</p>
          <p>Streamer Key : {stream_data.streamKey}</p>

          <Button
            onClick={() => {
              props.history.push(`/public/${userData.username}`);
            }}
            align="right"
            className=""
          >
            {" "}
            Watch Stream{" "}
          </Button>
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
              {/*<div>
                                <h4 className={classes.display_livestreamers}> Live channels we think you'll like </h4>
                                <div className={classes.display_all_streamers}>
                                    {activeStreams.map((stream, i) => {
                                        return (
                                            <div key={i} className={classes.all_streams_list}>
                                                <Link to={`./public/${stream.id}`} style={{ textDecoration: 'none', color: "inherit" }}>
                                                    <p>Name : {stream.name}</p>
                                                    <p>Id : {stream.id}</p>
                                                    <p>Key : {stream.streamKey}</p>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>*/}

              <div>
                <h4 className={classes.display_livestreamers}>
                  {" "}
                  Playback Videos{" "}
                </h4>
                <div className={classes.display_all_streamers}>
                  {/*{idleStreams.map((stream, i) => {
                                            return (
                                                <div key={i} className={classes.all_streams_list}>
                                                    <Link to={`./public/${stream.id}`} style={{ textDecoration: 'none', color: "inherit" }}>
                                                        <p>Name : {stream.name}</p>
                                                        <p>Id : {stream.id}</p>
                                                        <p>Key : {stream.streamKey}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })}*/}
                  <Carousel cols={4}>
                    {arrayData.map((playbackUser, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <CarouselCard playbackUserData={playbackUser} />
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
