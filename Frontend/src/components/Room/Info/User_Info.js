import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from 'axios'
import {Button, Form, Spinner} from "react-bootstrap";


import VideoPlayer from  '../VideoPlayer/VideoPlayer'

const UserInfo = (props) => {
   
    const [userData, setUserData] = useState(null);
    

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");
    const [twitchKey, setTwitchKey] = useState("");
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");

     const get_User = async() =>{
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${props.stream_id}`)
        .then((value)=>{
            setUserData(value.data)
            setPlaybackUrl(`https://cdn.livepeer.com/hls/${value.data.livepeer_data.playbackId}}/index.m3u8`)
            setName(value.data.livepeer_data.name)
            setUserStreams(value.data.livepeer_data);
        })  
        
        console.log(userStreams)
    }

    useEffect(() => {
        console.log(props.stream_id)
        get_User();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



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
