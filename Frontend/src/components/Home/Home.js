import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import Sidebar from "../Room/Navbar/Sidebar"
import {Row, Col} from "react-bootstrap";

const Home = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const Livepeer = require("livepeer-nodejs");
    const livepeerObject = new Livepeer(key);

    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [allStreams, setAllStreams] = useState([]);


    const getStreams = async () => {
        setAllStreams([])
        const streams = await livepeerObject.Stream.getAll(1, false, false);
        for (let i = 0; i < streams.length; i++) {
            setAllStreams((prevState) => [...prevState, streams[i]]);
        }
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
            <Row className={classes.main_body_sections}>
                    <Col xs={2}>      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} style={{paddingTop:"20px"}}>
                        <center>
                            <Button variant="primary" onClick={handleShow}>
                                Create Stream
                            </Button>
                        </center>
                        <br />
                        <div className={classes.display_all_streamers}>
                            {allStreams.map((stream, i) => {
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
                    </Col> 
            </Row>
            

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
