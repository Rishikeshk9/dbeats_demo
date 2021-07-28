import React, { useState,useEffect } from "react";
import { Modal, Button, Form, Spinner, Table } from "react-bootstrap";

const Home = (props) => {
  var key = "d98e11c9-2267-4993-80da-6215d73b42c1";
  const Livepeer = require("livepeer-nodejs");
  const livepeerObject = new Livepeer(key);

  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const allStreams=[];
  

  const getStreams = async() =>{
    const streams = await livepeerObject.Stream.getAll(1,false,false);
    for (let i = 0; i < streams.length; i++) {
      allStreams.push([streams[i].name,streams[i].id,streams[i].streamKey]);
    }
    console.log("sessions",allStreams)
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

    // props.history.push(`/room/${id}`);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <center>
        <Button variant="primary" onClick={handleShow}>
          Create Stream
        </Button>
      </center>
      <br/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Streamer Name</th>
            <th>Stream ID</th>
            <th>Stream Key</th>
          </tr>
        </thead>
        <tbody>
        {allStreams.map((stream,i) => {
          return (
            <tr key={i}>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          )
        })}
        </tbody>
      </Table>


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
