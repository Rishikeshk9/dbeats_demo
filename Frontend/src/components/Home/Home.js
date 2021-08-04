import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import SideBar from "../Navbar/Sidebar"
import {Row, Col} from "react-bootstrap";
import axios from 'axios'

const Home = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const Livepeer = require("livepeer-nodejs");
    const livepeerObject = new Livepeer(key);

    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [idleStreams, setIdleStreams] = useState([]);
    const [activeStreams, setActiveStreams] = useState([]);


    const getStreams = async () => {
        setIdleStreams([])
        setActiveStreams([])

        // const streams = await livepeerObject.Stream.getAll(1, false, false);
        // for (let i = 0; i < streams.length; i++) {
        //     setAllStreams((prevState) => [...prevState, streams[i]]);
        // }

        const idleStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": false}]`;
        
        const AuthStr = 'Bearer '.concat(key); 
         
        
        axios.get(idleStreamUrl, { 
            headers: { 
                crossDomain : true,
                withCredentials: true,
                Authorization: AuthStr,
                'Access-Control-Allow-Origin' : '*',
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
                'Access-Control-Allow-Credentials': 'true',
            } 
        })
        .then((repos) => {
          for (let i = 0; i < repos.data.length; i++) {
            setIdleStreams((prevState) => [...prevState, repos.data[i]]);
            }
            console.log(repos)
        });

        const activeStreamUrl = `https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "isActive", "value": true}]`;
        axios.get(activeStreamUrl, { headers: { Authorization: AuthStr,'Access-Control-Allow-Origin': '*'} })
        .then((repos) => {
          for (let i = 0; i < repos.data.length; i++) {
            setActiveStreams((prevState) => [...prevState, repos.data[i]]);
            }
            console.log(repos)
        });
    }


    useEffect(() => {
        getStreams();
    }, [])

    const createStream = async () => {
        console.log(name);
        setLoader(false);
        const stream = await livepeerObject.Stream.create({
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
        });
        setLoader(true);

        console.log(stream);
        var id = stream.id;

        props.history.push(`/streamer/${id}`);
        getStreams();
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <>

            <div id="outer-container" style={{ height: '100vh' }}>
                <SideBar />
                <main id="page-wrap">
                    <center>
                    <Button variant="primary" onClick={handleShow}>
                        Create Stream
                    </Button>
                    </center>
                    <br />
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
                    <h2 align="center">Idle Streams</h2>
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
