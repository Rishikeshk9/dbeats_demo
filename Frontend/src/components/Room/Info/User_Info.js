import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from 'axios'
import {Button, Form, Spinner} from "react-bootstrap";


import VideoPlayer from  '../VideoPlayer/VideoPlayer'

const UserInfo = (props) => {
   
    

    const [userStreams, setUserStreams] = useState([]);
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const [playbackUrl, setPlaybackUrl] = useState("");
    const [twitchKey, setTwitchKey] = useState("");
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");

     

    useEffect(() => {
        console.log(props.stream_id)
            setPlaybackUrl(`https://cdn.livepeer.com/hls/${user.livepeer_data.playbackId}/index.m3u8`)
            setName(user.livepeer_data.name)
            setUserStreams(user.livepeer_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChange = (e) => {
        setTwitchKey(e.target.value);
    };


    const createMultiStream = async () => {
        setLoader(false);
        console.log("heelo",twitchKey)
        let streamData = {
            name: `${userStreams.name}`,
            url: `rtmp://rtmp.twitch.tv/live/${twitchKey}`
        }
        console.log(streamData)
        const stream = await axios({
          method:'POST',
          url: `${process.env.REACT_APP_SERVER_URL}/create_multistream`,
          data: streamData,
        })


        let patchId = stream.data.id;
        console.log(patchId)
        
        let patchStreamData = {
            multistream: {
                targets: [
                    {
                        id: `${patchId}`,
                        profile: "720p",
                    },
                    {
                        id: `${patchId}`,
                        profile: "480p",
                    }
                ]
            },
            stream_id:userStreams.id
        }

        const patchingStream = await axios({
          method:'POST',
          url: `${process.env.REACT_APP_SERVER_URL}/patch_multistream`,
          data: patchStreamData,
        })

        console.log(patchingStream)


        setLoader(true);
        alert(" Multistream Creation Successfull !!!");
    };


    return (
        <Fragment>
            <div className={classes.info_main_body}>                 
                    <div>
                        <VideoPlayer 
                            playbackUrl={playbackUrl}
                            className="rounded"
                        />
                    </div>
                    <div>
                        <div className="bg-white py-3 pl-4 mr-3 rounded text-xl shadow">
                            <div className="pb-2">
                                <span className="font-semibold">Streamer Name : </span>
                                <span>{user.name}</span>
                            </div>
                            <div className="pb-2">
                                <span className="font-semibold">Streamer Username : </span>
                                <span>{user.username}</span>
                            </div>
                            <div className="pb-2">
                                <span className="font-semibold">Streamer Id : </span>
                                <span>{userStreams.id}</span>
                            </div>
                            <div className="pb-2">
                                <span className="font-semibold">Streamer Key : </span>
                                <span>{userStreams.streamKey}</span>
                            </div>
                            <div className="pb-2 text-lg">
                                <span className="font-semibold">Playback URL : </span>
                                <span>{playbackUrl}</span>
                            </div>
                            <hr width="95%"/>
                            <div>
                                <div className="flex">
                                    <button variant="primary" className="bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold px-4 py-2" type="button" onClick={createMultiStream}>
                                        Start MultiStreaming
                                    </button>
                                    <div className={classes.multistream_form_spinner}>
                                        <Spinner animation="border"  variant="info" role="status" hidden={loader}>   
                                        </Spinner>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </Fragment>
    );
};

export default UserInfo;
