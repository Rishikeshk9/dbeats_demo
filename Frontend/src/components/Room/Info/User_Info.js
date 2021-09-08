import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from 'axios'
import { Button, Form, Spinner, Modal } from "react-bootstrap";


import { MultiStreamData } from '../../../assests/Data';
import VideoPlayer from '../VideoPlayer/VideoPlayer'

const UserInfo = (props) => {



    const [userStreams, setUserStreams] = useState([]);

    const user = JSON.parse(window.localStorage.getItem("user"));
    let multistream_platform= JSON.parse(window.localStorage.getItem("multiStream"));

    const [playbackUrl, setPlaybackUrl] = useState("");
    const [StreamKey, setKey] = useState("");
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [showStreamModal, setShowStreamModal] = useState(false);

    const [multiStreamValue, setMultiStreamValue] = useState({});
    const [multiStreamConnected, setMultiStreamConnected] = useState([])


    useEffect(() => {
        //console.log(props.stream_id)
        //localStorage.removeItem('multiStream');
        let array=[];
        if(multistream_platform === null){
            window.localStorage.setItem("multiStream", JSON.stringify(array));
        }
        else if(multistream_platform !== array){

            setMultiStreamConnected(multistream_platform);
        }
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${user.livepeer_data.playbackId}/index.m3u8`)
        setName(user.livepeer_data.name)
        setUserStreams(user.livepeer_data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //console.log(multiStreamConnected)

    const handleChange = (e) => {
        e.preventDefault();
        setKey(e.target.value);
    };


    const createMultiStream = async (props) => {
        //console.log(props)
        let data = {
            title: multiStreamValue.title,
            logo: multiStreamValue.logo
        }

        setLoader(false);
        
        let patchStreamData = {
            name: `${multiStreamValue.title}`,
            url: `${props}`,
            stream_id:userStreams.id
        }
        //console.log(patchStreamData)

        const patchingStream = await axios({
          method:'POST',
          url: `${process.env.REACT_APP_SERVER_URL}/patch_multistream`,
          data: patchStreamData,
        })

        //console.log(patchingStream)

        setLoader(true);
        alert(" Multistream Creation Successfull !!!");
        setShowStreamModal(false);
        
        setMultiStreamConnected(
            [...multiStreamConnected, data]
        );

        let datavalue=multiStreamConnected;
        datavalue.push(data)

        const timer = setTimeout(() => {
          window.localStorage.setItem("multiStream", JSON.stringify(datavalue));
        }, 2000);
        return () => clearTimeout(timer);

        
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
                            <span className="text-2xl font-semibold">Streamer Name : </span>
                            <p>{user.name}</p>
                        </div>
                        <div className="pb-2">
                            <span className="text-2xl font-semibold">Streamer Username : </span>
                            <p>{user.username}</p>
                        </div>
                        <div className="pb-2">
                            <span className="text-2xl font-semibold">Streamer Id : </span>
                            <p>{userStreams.id}</p>
                        </div>
                        <div className="pb-2">
                            <span className="text-2xl font-semibold">Streamer Key : </span>
                            <p>{userStreams.streamKey}</p>
                        </div>
                        <div className="pb-2  break-words">
                            <span className="text-2xl font-semibold">Playback URL : </span>
                            <p>{playbackUrl}</p>
                        </div>
                        <hr width="95%" className="mt-2 mb-4"/>
                        <div>
                            <div className="flex">
                                <button variant="primary" 
                                    className="bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold px-4 py-2"
                                    type="button"
                                    onClick={() => setModalShow(true)}
                                >
                                    Add MultiStreaming
                                </button>
                                <div className={classes.multistream_form_spinner}>
                                    <Spinner animation="border" variant="info" role="status" hidden={loader}>
                                    </Spinner>
                                </div>
                                <div className="flex">
                                    {multiStreamConnected.map((value, index) => {
                                        return (
                                            <div className="mx-1">
                                                <img src={value.logo}
                                                    alt="logo"
                                                    className="h-10 w-auto"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>




            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="w-full">
                        <div className="font-semibold text-2xl text-center">
                            Select the MultiStream Platform
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex">
                        {MultiStreamData.map((value, index) => {
                            return (
                                <div className="bg-white-200 mx-1 border-1 border-gray-300 rounded">
                                    <img src={value.image}
                                        alt="logo"
                                        className="h-32 w-auto"
                                        onClick={() => {
                                            setMultiStreamValue(value);
                                            setShowStreamModal(true);
                                            setModalShow(false)
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>




            <Modal
                show={showStreamModal}
                onHide={() => setShowStreamModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="w-full">
                        <div className="font-semibold text-3xl text-center">
                            {multiStreamValue.title}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 text-xl">
                            <Form.Label><b>Enter Stream-Key </b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter SECRET Key"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "80%" }}
                            />
                            <div className="py-2 pt-3 pl-1">
                                RTMP : {multiStreamValue.rtmp + StreamKey}
                            </div>

                            <div style={{ display: "flex" }}>
                                <Button variant="primary" className=" border-0 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light rounded px-4 py-2"
                                    type="button"
                                    onClick={() => {
                                        let rtmp = multiStreamValue.rtmp + StreamKey;
                                        createMultiStream(rtmp)
                                    }
                                    }
                                >
                                    <div className="text-white text-lg font-semibold">
                                        Add {multiStreamValue.title}
                                    </div>
                                </Button>

                                <div className={classes.multistream_form_spinner}>
                                    <Spinner animation="border" variant="info" role="status" hidden={loader}>
                                    </Spinner>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </Fragment>
    );
};

export default UserInfo;
