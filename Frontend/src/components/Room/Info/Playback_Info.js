import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import playimg from "../../../assests/images/telegram.png";
import axios from "axios";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Modal, ListGroup } from "react-bootstrap";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import { PinterestShareButton, PinterestIcon } from "react-share";
import { TelegramShareButton, TelegramIcon } from "react-share";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Playback = (props) => {
  let sharable_data = `https://dbeats-demo.vercel.app/#/playback/${props.stream_id}/${props.video_id}`;

  const user = JSON.parse(window.localStorage.getItem("user"));

  const [playbackUrl, setPlaybackUrl] = useState("");

  const [userData, setUserData] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showMore, setShowMore] = useState(false);

  const handleCloseMore = () => setShowMore(false);
  const handleShowMore = () => setShowMore(true);

  const text = "Copy Link To Clipboard";
  const [buttonText, setButtonText] = useState(text);

  const handleSubscribe = () => {
    const SubscribeData = {
      name: `${user.name}`,
      username: `${user.username}`,
      video_name: `${userData.name}`,
      video_username: `${userData.username}`,
    };
    console.log(SubscribeData);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/user/subscribe`,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: SubscribeData,
    })
      .then(function (response) {
        if (response) {
          console.log(response);
        } else {
          alert("Invalid Login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const get_User = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${props.stream_id}`)
      .then((value) => {
        setUserData(value.data);
        setPlaybackUrl(`${value.data.videos[props.video_id].link}`);
      });
    //console.log(value.data)
  };

  useEffect(() => {
    get_User();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  return (
    <div className=" ">
      <div
        className={`  grid sm:grid-cols-1 lg:grid-cols-3 grid-flow-row pt-3 pb-50 `}
      >
        <div className=" col-span-2 ">
          <div>
            {console.log(playbackUrl)}
            <VideoPlayer playbackUrl={playbackUrl} />
          </div>
          <div className="mx-5 px-2">
            <div className="flex justify-between my-2  ">
              <div>
                <div
                  className=" w-full p-0 text-left mt-0"
                  style={{ padding: "0px" }}
                >
                  <h4>Drake Songs</h4>
                  <p>Rap Songs</p>
                </div>
                <button
                  className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                  onClick={handleSubscribe}
                >
                  <span>Subscribe</span>
                </button>
                <button className="bg-gradient-to-r from-dbeats-light  to-purple-900  p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white ">
                  <i className="fas fa-volleyball-ball mr-1"></i>
                  <span>Appreciate</span>
                </button>
              </div>
              <div className="text-4xl">
                <button
                  className="border-0 bg-transparent"
                  onClick={handleShow}
                >
                  <i className="fas fa-share opacity-50 mx-2"></i>
                </button>
                <i className="fas fa-heart opacity-50 mx-2"></i>
                <i className="fas fa-heart-broken opacity-50 mx-2"></i>
                <i className="far fa-laugh-squint opacity-50 mx-2"></i>
                <i className="far fa-angry opacity-50 mx-2"></i>
                <button
                  className={classes.more_options}
                  onClick={handleShowMore}
                >
                  <i className="fas fa-ellipsis-h opacity-50 mx-2"></i>
                </button>
              </div>
              <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Share link on</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col className="flex justify-around align-center">
                        <WhatsappShareButton url={sharable_data}>
                          <WhatsappIcon
                            iconFillColor="white"
                            size={60}
                            round={true}
                          />
                        </WhatsappShareButton>
                        <FacebookShareButton url={sharable_data}>
                          <FacebookIcon
                            iconFillColor="white"
                            size={60}
                            round={true}
                          />
                        </FacebookShareButton>
                        <EmailShareButton url={sharable_data}>
                          <EmailIcon
                            iconFillColor="white"
                            size={60}
                            round={true}
                          />
                        </EmailShareButton>
                        <PinterestShareButton url={sharable_data}>
                          <PinterestIcon
                            iconFillColor="white"
                            size={60}
                            round={true}
                          />
                        </PinterestShareButton>
                        <TelegramShareButton url={sharable_data}>
                          <TelegramIcon
                            iconFillColor="white"
                            size={60}
                            round={true}
                          />
                        </TelegramShareButton>
                      </Col>
                    </Row>
                    <Row>
                      <CopyToClipboard
                        text={sharable_data}
                        className="block mx-auto p-2 mt-4 mb-2 w-96 text-white font-semibold rounded-lg bg-dbeats-light"
                      >
                        <button
                          type="submit"
                          onClick={() => setButtonText("Link Copied!")}
                        >
                          {buttonText}
                        </button>
                      </CopyToClipboard>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>

              <Modal show={showMore} onHide={handleCloseMore} centered>
                <Modal.Header closeButton>
                  <Modal.Title>More Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    <ListGroup.Item active>demo 1</ListGroup.Item>
                    <ListGroup.Item>demo 2</ListGroup.Item>
                    <ListGroup.Item>demo 3</ListGroup.Item>
                    <ListGroup.Item>demo 4</ListGroup.Item>
                  </ListGroup>
                </Modal.Body>
              </Modal>
            </div>

            <div className=" bg-gray-800 mb-40 mt-3  rounded-sm">
              <iframe
                className="w-full h-92"
                src="https://theconvo.space/embed/dt?threadId=KIGZUnR4RzXDFheXoOwo"
                allowtransparency="true"
                loading="eager"
              />
            </div>
          </div>
        </div>
        <div className="  w-full col-span-1 px-5">
          {/* {peers.map((peer, index) => {
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
                    })} */}

          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            <div className="flex">
              <div className="h-28 w-48 bg-profile-cover">ss</div>
              <div className="pl-3 text-sm">
                <p className="text-2xl font-semibold mb-0">Drake Songs</p>
                <span>Rushikesh</span>
                <i class="ml-1 fas fa-check-circle"></i>

                <p>
                  <span className="text-sm font-semibold mr-2">55K views</span>
                  <span>1 Month Ago</span>
                </p>
              </div>
              <i class="fas fa-ellipsis-v text-gray-300 hover:text-gray-600 cursor-pointer block ml-auto mt-2 mr-2 text-lg"></i>
            </div>

            <div className="flex">
              <div className="h-28 w-48 bg-profile-cover">ss</div>
              <div className="pl-3 text-sm">
                <p className="text-2xl font-semibold mb-0">Drake Songs</p>
                <span>Rushikesh</span>
                <i class="ml-1 fas fa-check-circle"></i>

                <p>
                  <span className="text-sm font-semibold mr-2">55K views</span>
                  <span>1 Month Ago</span>
                </p>
              </div>
              <i class="fas fa-ellipsis-v text-gray-300 hover:text-gray-600 cursor-pointer block ml-auto mt-2 mr-2 text-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playback;
