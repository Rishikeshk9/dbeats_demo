import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import NavBar from "../Navbar/Navbar";
import axios from 'axios'
import {Carousel} from '3d-react-carousal';

import ReactPlayer from "react-player";


const Home = (props) => {


    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const AuthStr = 'Bearer '.concat(key); 
    const Livepeer = require("livepeer-nodejs");
    const livepeerObject = new Livepeer(key);

    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [idleStreams, setIdleStreams] = useState([]);
    const [activeStreams, setActiveStreams] = useState([]);
    const [slides, setSlides] = useState([]);


    const CarouselStreams = ({stream_data}) =>{
        return(
            <Row className={classes.cards_main_body}>                 
                    <Col className={classes.cards_video_body}>
                        <ReactPlayer 
                            width="auto"
                            height="100%"
                            playing={true}
                            muted={true} 
                            url="https://fra-cdn.livepeer.com/recordings/5a0bf957-ca7b-4d61-885f-fa24c27ca035/index.m3u8" 
                            controls={true}  
                        />
                    </Col>
                    <Col>
                        <p>Streamer Name : {stream_data.name}</p>
                        <p>Streamer Id : {stream_data.id}</p>
                        <p>Streamer Key : {stream_data.streamKey}</p>

                        <Button 
                            onClick={() => {props.history.push(`/public/${stream_data.id}`) } } 
                            align="right"
                        > Watch Stream </Button>
                    </Col>
            </Row>
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

    const createStream = async () => {
        setLoader(false);
        let streamData = {
            name: `${name}`,
            profiles: [
                {
                    name: "720p",
                    bitrate: 2000000,
                    fps: 30,
                    width: 1280,
                    height: 720,
                },
                {
                    name: "480p",
                    bitrate: 1000000,
                    fps: 30,
                    width: 854,
                    height: 480,
                },
                {
                    name: "36p",
                    bitrate: 500000,
                    fps: 30,
                    width: 640,
                    height: 360,
                },
            ],
        }

        const stream = await axios({
            method: 'post',
            url: 'https://livepeer.com/api/stream',
            data: streamData,
            headers: {
                'content-type': 'application/json',
                Authorization: AuthStr
            },
        });

        setLoader(true);
        var id = stream.data.id;

        props.history.push(`/streamer/${id}`);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <>

            <div id="outer-container" style={{ height: '100vh' }}>
                <NavBar />
                <main id="page-wrap">
                    <div align="center" className={classes.create_stream_url}>
                        <Button variant="primary" onClick={handleShow}>
                            Create Stream
                        </Button>
                    </div>
                    <div>
                        <h2 align="center">Active Streams</h2>
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
                        <Carousel slides={slides} autoplay={false}/>
                    </div>
                    <div>
                        <h2 align="center" style={{marginTop:"25px"}}>Idle Streams</h2>
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
                </main>
            </div>                    
            

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Get Ready</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Streamer's Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="button" onClick={createStream}>
                            Start Streaming
                        </Button>
                        <Spinner animation="border" variant="info" role="status" hidden={loader}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Home;
