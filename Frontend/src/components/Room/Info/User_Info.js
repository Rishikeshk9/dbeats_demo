import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from 'axios'
import {FormControl,Button, Form, Spinner} from "react-bootstrap";
import Alert from '@material-ui/lab/Alert';


import VideoPlayer from  '../VideoPlayer/VideoPlayer'

const UserInfo = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    
    const AuthStr = 'Bearer '.concat(key); 
    const apiUrl = `https://livepeer.com/api/stream/${props.stream_id}`;

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");
    const [twitchKey, setTwitchKey] = useState("");
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");

    useEffect(() => {
        console.log(props.stream_id)

        const AuthStr = 'Bearer '.concat(key); 
        axios.get(apiUrl, { headers: { Authorization: AuthStr } })
        .then((res) => {
          setUserStreams(res.data);
        });
    }, []);


    useEffect(() => {
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${userStreams.playbackId}/index.m3u8`)
        setName(userStreams.name)
    }, [userStreams]);


    const handleChange = (e) => {
        setTwitchKey(e.target.value);
    };


    const createMultiStream = async () => {
        setLoader(false);
        console.log(name)
        let streamData = {
            name: `${userStreams.name}`,
            url: `rtmp://rtmp.twitch.tv/live/${twitchKey}`
        }

        const stream = await axios({
            method: 'post',
            url: 'https://livepeer.com//api/multistream/target/',
            data: streamData,
            headers: {
                'content-type': 'application/json',
                Authorization: AuthStr
            },
        });


        let patchId = stream.data.id;
        console.log(patchId)
        let patchStreamData = {
            multistream: {
                targets: [
                    {
                        id: `${patchId}`,
                        profile: "720p",
                    }
                ]
            }
        }

        const patchingStream = await axios({
            method: 'PATCH',
            url: apiUrl,
            data: patchStreamData,
            headers: {
                'content-type': 'application/json',
                Authorization: AuthStr
            },
        });

        console.log(patchingStream)


        setLoader(true);
        alert(" Multistream Creation Successfull !!!");
    };

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
                        <hr width="95%"/>
                        <div>
                            <Form>                                
                                <Form.Group className="mb-3" controlId="formBasicKey">
                                    <Form.Label><b>To Simultaneously Stream on Twitch Enter Twitch-Stream-Key </b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter SECRET Key"
                                        onChange={(e) => handleChange(e)}
                                        style={{width:"80%"}}
                                    />
                                    
                                    <div style={{display:"flex"}}>
                                        <Button variant="primary" className={classes.multistream_form_button} type="button" onClick={createMultiStream}>
                                            Start MultiStreaming
                                        </Button>
                                        <div className={classes.multistream_form_spinner}>
                                            <Spinner animation="border"  variant="info" role="status" hidden={loader}>   
                                            </Spinner>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
            </div>
        </Fragment>
    );
};

export default UserInfo;
