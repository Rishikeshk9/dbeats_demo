import React, { useRef, Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import Peer from "simple-peer";
import { useSelector } from "react-redux";

import ReactHlsPlayer from 'react-hls-player';
import ReactPlayer from 'react-player'

import playimg from '../../../assests/images/telegram.png';
import axios from 'axios'

import VideoPlayer from  '../VideoPlayer/VideoPlayer'

const Public_Info = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    // const Livepeer = require("livepeer-nodejs");
    // const livepeerObject = new Livepeer(key);


    const ref = useRef();
    const flag = false
    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");

    const getStreams = async () => {
        console.log(props.stream_id)
        //const stream = await livepeerObject.Stream.get(props.stream_id);
        
        const myInit = {
            method: 'HEAD',
            mode: 'no-cors',
        };
        const apiUrl = `https://livepeer.com/api/stream/${props.stream_id}`;
        const AuthStr = 'Bearer '.concat(key); 
        axios.get(apiUrl, { 
            headers: { 
                Authorization: AuthStr, 
            } 
        })
        .then((res) => {
          setUserStreams(res.data);
        });
    };


    useEffect(() => {
        getStreams();
    }, []);

    useEffect(() => {
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${userStreams.playbackId}/index.m3u8`)
    }, [userStreams]);


    return (
        <Fragment>
            <div className={classes.info_main_body}>
                <div id={classes.info_main_body_set}>
                    <div>
                        
                            <VideoPlayer 
                                playbackUrl="https://fra-cdn.livepeer.com/recordings/5a0bf957-ca7b-4d61-885f-fa24c27ca035/index.m3u8" 
                            />
                    </div>
                    
                    <div className={classes.info_localDisplay_features}>
                        <div>
                            <div className={classes.info_remoteVideo_text} style={{padding:"0px"}}>
                                    <h4>Drake Songs</h4>
                                    <p>Rap Songs</p>
                            </div>
                            <button className={classes.info_subscribe_button}>
                                <span>Subscribe</span>
                            </button>
                            <button className={classes.info_apprecite_button}>
                                <i className="fas fa-volleyball-ball"></i>
                                <span>Apprecite</span>
                            </button>
                        </div>
                        <div className={classes.info_localDisplay_icons}>
                            <i className="fas fa-share"></i>
                            <i className="fas fa-heart"></i>
                            <i className="fas fa-heart-broken"></i>
                            <i className="far fa-laugh-squint"></i>
                            <i className="far fa-angry"></i>
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                </div>
                <div className={classes.info_short_section}>
                    {/* {peers.map((peer, index) => {
                        peer.on("stream", (stream) => {
                            ref.current.srcObject = stream;
                        });
                        return (
                            <div key={index} className={classes.info_short_section_details}>
                                <div>
                                    <video
                                        className={classes.info_remoteVideo}
                                        ref={ref}
                                        autoPlay
                                        playsInline
                                    ></video>
                                </div>
                                <div className={classes.info_remoteVideo_text}>
                                    <h4>Title</h4>
                                    <p>Description</p>
                                    <span>Tags</span>
                                </div>
                            </div>
                        );
                    })} */}
                    <h5>Playlist</h5>
                   <div className={classes.playlist}>
                       <img src={playimg} className={classes.playlist_img} alt="img"></img>
                       <div className={classes.playlist_name}>
                           <h3>Drake Songs</h3>
                           <p>Rap song</p>
                       </div>
                       <i className="fas fa-info-circle" style={{display:"block", marginLeft:"auto", 
                        marginTop:"10px", marginRight:"10px", fontSize:"medium"} }>
                       </i>
                   </div>
                   <div className={classes.playlist}>
                       <img className={classes.playlist_img} src={playimg} alt="img"></img>
                       <div className={classes.playlist_name}>
                           <h3>Drake Songs</h3>
                           <p>Rap song</p>
                       </div>
                       <i className="fas fa-info-circle" style={{display:"block", marginLeft:"auto", 
                        marginTop:"10px", marginRight:"10px", fontSize:"medium"} }>
                       </i>
                   </div>
                   
                </div>
            </div>

        </Fragment>
    );
};

export default Public_Info;
