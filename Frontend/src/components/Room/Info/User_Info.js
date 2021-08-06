import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from 'axios'

import VideoPlayer from  '../VideoPlayer/VideoPlayer'

const UserInfo = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");

    useEffect(() => {
        console.log(props.stream_id)

        const apiUrl = `https://livepeer.com/api/stream/${props.stream_id}`;
        const AuthStr = 'Bearer '.concat(key); 
        axios.get(apiUrl, { headers: { Authorization: AuthStr } })
        .then((res) => {
          setUserStreams(res.data);
        });
    }, []);

    useEffect(() => {
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${userStreams.playbackId}/index.m3u8`)
    }, [userStreams]);

    return (
        <Fragment>
            <div className={classes.info_main_body}>                 
                    <div>
                        <VideoPlayer 
                            playbackUrl="https://fra-cdn.livepeer.com/recordings/5a0bf957-ca7b-4d61-885f-fa24c27ca035/index.m3u8" 
                        />
                    </div>
                    <div>
                        <p>Streamer Name : {userStreams.name}</p>
                        <p>Streamer Id : {userStreams.id}</p>
                        <p>Streamer Key : {userStreams.streamKey}</p>
                        <p>Playback URL : {playbackUrl}</p>
                    </div>
            </div>
        </Fragment>
    );
};

export default UserInfo;
