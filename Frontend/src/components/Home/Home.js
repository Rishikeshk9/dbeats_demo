import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import NavBar from "../Navbar/Navbar";
import axios from 'axios'
import {Carousel} from '3d-react-carousal';
import personImg from "../../assests/images/person.jpg"
import {Avatar} from "@material-ui/core"
 
import ReactPlayer from "react-player";


const Home = (props) => {


    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const AuthStr = 'Bearer '.concat(key); 

    const [idleStreams, setIdleStreams] = useState([]);
    const [activeStreams, setActiveStreams] = useState([]);
    const [slides, setSlides] = useState([]);

    const recommend_channels=[{name:"shroud"},{name:"shroud"},{name:"shroud"},{name:"shroud"},{name:"shroud"}]


    const CarouselStreams = ({stream_data}) =>{
        return(
            <div className={classes.cards_main_body}>                 
                    <div className={classes.cards_video_body}>
                        <ReactPlayer 
                            width="100%"
                            height="auto"
                            playing={true}
                            muted={true} 
                            url="https://fra-cdn.livepeer.com/recordings/5a0bf957-ca7b-4d61-885f-fa24c27ca035/index.m3u8" 
                            controls={true}  
                        />
                    </div>
                    <div className={classes.cards_video_body}>
                        <p>Streamer Name : {stream_data.name}</p>
                        <p>Streamer Id : {stream_data.id}</p>
                        <p>Streamer Key : {stream_data.streamKey}</p>

                        <Button 
                            onClick={() => {props.history.push(`/public/${stream_data.id}`) } } 
                            align="right"
                        > Watch Stream </Button>
                    </div>
            </div>
        );
    }


    useEffect(() => {
        setIdleStreams([])
        setActiveStreams([])
        setSlides([])

        const idleStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": false}]`;
        const activeStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": true}]`;
        
        axios.get(idleStreamUrl, { 
            headers: { 
                Authorization: AuthStr,
                'Access-Control-Allow-Origin' : '*',
            } 
        })
        .then((repos) => {
          for (let i = 0; i < repos.data.length; i++) {
            setIdleStreams((prevState) => [...prevState, repos.data[i]]);
            setSlides((prevState) => [...prevState, <CarouselStreams stream_data={repos.data[i]} />])
            }
            console.log(repos)
        });

        
        axios.get(activeStreamUrl, { 
            headers: { 
                Authorization: AuthStr,
                'Access-Control-Allow-Origin': '*'
            } 
        })
        .then((repos) => {
            for (let i = 0; i < repos.data.length; i++) {
                setActiveStreams((prevState) => [...prevState, repos.data[i]]);
            }
            console.log(repos)
        });

    }, [])
    

    return (
        <>
            <div>
                <NavBar />
                <div id="outer-container" style={{ height: '100vh' }}>
                    <main id="page-wrap" className={classes.main_homepage_body} >
                        
                        <div id="recommended_channel" className={classes.recommended_channel_section} >
                            <div className={classes.recommended_title} >
                                <h5> RECOMMENDED CHANNELS ...</h5>
                                {recommend_channels.map((channel, i) => {
                                        return (
                                            <div key={i} className={classes.channel_style}>
                                                <Avatar className={classes.channel_avatar} alt={channel.name} src={personImg}/>
                                                <div>
                                                    <h6> {channel.name} </h6>
                                                    <span> Counter Strike... </span>
                                                </div>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                        

                        <div id="display_videos" className={classes.display_videos_section}>
                            <div>
                                <Carousel slides={slides} autoplay={false}/>
                            </div>
                            <div>
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
                            </div>

                            <div>
                                <h4 className={classes.display_livestreamers}> Idle Streams </h4>
                                <div className={classes.display_all_streamers}>
                                    {idleStreams.map((stream, i) => {
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
                            </div>
                        </div>
                    </main>
                </div>
            </div>                    
        </>
    );
};

export default Home;
