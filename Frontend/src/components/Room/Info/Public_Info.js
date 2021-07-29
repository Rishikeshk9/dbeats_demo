import React, { useRef, Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import ReactHlsPlayer from 'react-hls-player';

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
};

const Public_Info = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const Livepeer = require("livepeer-nodejs");
    const livepeerObject = new Livepeer(key);

    const meetId = useSelector((store) => store);

    const flag = false;
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = meetId;
    const ref = useRef();

    // useEffect(() => {
    //     socketRef.current = io.connect("https://dbeats-server.herokuapp.com/");
    //     navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
    //         socketRef.current.emit("join room", roomID);
    //         socketRef.current.on("all users", users => {
    //             const peers = [];
    //             users.forEach(userID => {
    //                 const peer = createPeer(userID, socketRef.current.id, stream);
    //                 peersRef.current.push({
    //                     peerID: userID,
    //                     peer,
    //                 })
    //                 peers.push(peer);
    //             })
    //             setPeers(peers);
    //         })

    //         socketRef.current.on("user joined", payload => {
    //             const peer = addPeer(payload.signal, payload.callerID, stream);
    //             peersRef.current.push({
    //                 peerID: payload.callerID,
    //                 peer,
    //             })

    //             setPeers(users => [...users, peer]);
    //         });

    //         socketRef.current.on("receiving returned signal", payload => {
    //             const item = peersRef.current.find(p => p.peerID === payload.id);
    //             item.peer.signal(payload.signal);
    //         });
    //     })
    // },[]);

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");

    const getStreams = async () => {
        setUserStreams([]);
        console.log(meetId)
        const streams = await livepeerObject.Stream.getAll(1, false, false);
        for (let i = 0; i < streams.length; i++) {
            if(streams[i].id===props.stream_id){
                setUserStreams(streams[i]);
                break;
            }
            
        }
        console.log("User", userStreams);
    };


    useEffect(() => {
        getStreams();
    }, []);

    useEffect(() => {
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${userStreams.playbackId}/index.m3u8`)
    }, [userStreams]);

    // const createPeer = (userToSignal, callerID) => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //     });

    //     peer.on("signal", (signal) => {
    //         socketRef.current.emit("sending signal", {
    //             userToSignal,
    //             callerID,
    //             signal,
    //         });
    //     });

    //     return peer;
    // };

    // const addPeer = (incomingSignal, callerID) => {
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //     });

    //     peer.on("signal", (signal) => {
    //         socketRef.current.emit("returning signal", { signal, callerID });
    //     });
    //     peer.ontrack = (event) => {
    //         userVideo.current.srcObject = event.streams[0];
    //     };

    //     peer.signal(incomingSignal);

    //     return peer;
    // };

    return (
        <Fragment>
            <div className={classes.info_main_body}>
                <div>
                    <div className={classes.info_localDisplay}>
                        <ReactHlsPlayer
                            id="gum-local"
                            src={playbackUrl}
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="auto"
                          />

                        {/*<video
                            id="gum-local"
                            autoPlay
                            playsInline
                            muted
                        >
                            <source src={playbackUrl} type="application/x-mpegURL" />
                        </video>*/}
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
                </div>
            </div>
        </Fragment>
    );
};

export default Public_Info;
