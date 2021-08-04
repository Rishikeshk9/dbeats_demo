import React, { useRef, Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import ReactHlsPlayer from 'react-hls-player';
import axios from 'axios'



const User_Info = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    // const Livepeer = require("livepeer-nodejs");
    // const livepeerObject = new Livepeer(key);

    const flag = false;
    const ref = useRef();

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");

    const getStreams = async () => {
        console.log(props.stream_id)
        // const stream = await livepeerObject.Stream.get(props.stream_id);
        // setUserStreams(stream);

        const apiUrl = `https://livepeer.com/api/stream/${props.stream_id}`;
        const AuthStr = 'Bearer '.concat(key); 
        axios.get(apiUrl, { headers: { Authorization: AuthStr } })
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
                <div>
                    <div style={{marginLeft:"50px"}}>
                        <p>Streamer Name : {userStreams.name}</p>
                        <p>Streamer Id : {userStreams.id}</p>
                        <p>Streamer Key : {userStreams.streamKey}</p>
                        <p>Playback URL : {playbackUrl}</p>
                    </div>
                    <div className={classes.info_localDisplay}>
                        <ReactHlsPlayer
                            id="gum-local"
                            src={playbackUrl}
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="auto"
                        />
                    </div>
                    <div className={classes.info_localDisplay_controls}>
                        <button disabled={flag}>Start</button>
                        <button disabled={flag}>Start</button>
                        <button disabled={flag}>Start</button>
                        <button disabled={flag}>Start</button>
                    </div>
                    <div className={classes.info_localDisplay_features}>
                        <div>
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
                    {/* <div>
                    {peers.map((peer, index) => {
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
                    })}
                    </div> */}
                </div>
            </div>
        </Fragment>
    );
};

export default User_Info;
