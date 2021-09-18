import React, { useEffect, useState } from "react";
import classes from "./Info.module.css";
//import playimg from "../../../assets/images/telegram.png";
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
import RecommendedCard from "./RecommendedCard";

const Playback = (props) => {
  let sharable_data = `https://dbeats-demo.vercel.app /playback/${props.stream_id}/${props.video_id}`;

  const user = JSON.parse(window.localStorage.getItem("user"));

  const [playbackUrl, setPlaybackUrl] = useState("");

  const [userData, setUserData] = useState(null);

  const [privateUser, setPrivate] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showMore, setShowMore] = useState(false);

  const handleCloseMore = () => setShowMore(false);
  const handleShowMore = () => setShowMore(true);

  const text = "Copy Link To Clipboard";
  const [buttonText, setButtonText] = useState(text);

  const [subscribeButtonText, setSubscribeButtonText] = useState("Subscribe");

  const [arrayData, setArrayData] = useState([]);

  const trackFollowers = () => {
    
    const followData = {
      following: `${userData.username}`,
      follower: `${user.username}`,
    };
    if (subscribeButtonText === "Subscribe") {
      setSubscribeButtonText("Unsubscribe");
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/user/follow`,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: followData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert("Invalid Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setSubscribeButtonText("Subscribe");
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/user/unfollow`,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: followData,
      })
        .then(function (response) {
          if (response) {
            //console.log(response);
          } else {
            alert("Invalid Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const get_User = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${props.stream_id}`)
      .then((value) => {
        setUserData(value.data);
        for (let i = 0; i < value.data.follower_count.length; i++) {
          if (value.data.follower_count[i] === user.username) {
            setSubscribeButtonText("Unsubscribe");
            break;
          }
        }
        setPlaybackUrl(`${value.data.videos[props.video_id].link}`);
      });
    //console.log(value.data)
  };

  const fetchData = async () => {
    const fileRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
    for (let i = 0; i < fileRes.data.array.length; i++) {
      if (
        fileRes.data.array[i].videos &&
        fileRes.data.array[i].username !== user.username
      ) {
        if (
          fileRes.data.array[i].username !== props.stream_id &&
          fileRes.data.array[i].videos.length > 0
        ) {
          setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
        }
      }
    }
    //console.log(fileRes, "Hi");
  };

  useEffect(() => {
    get_User();
    fetchData();
    let value = JSON.parse(window.localStorage.getItem("user"));
    console.log(value);
    if (value.username === props.stream_id) {
      setPrivate(true);
    } else {
      setPrivate(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [buttonText]);

  //console.log(arrayData);
  return (
    <div className=" ">
      <div
        className={`  grid sm:grid-cols-1 lg:grid-cols-3 grid-flow-row pt-3 pb-50 `}
      >
        <div className=" col-span-2 ">
          <div>
            {userData ? (
              <VideoPlayer
                playbackUrl={playbackUrl}
                name={userData.name}
                username={userData.username}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="mx-7 px-7">
            <div className="flex justify-between my-2  ">
              <div>
                <div
                  className=" w-full p-0 text-left mt-0"
                  style={{ padding: "0px" }}
                >
                  {userData ? (
                    <p className="font-semibold text-xl">
                      {userData.videos[0].videoName}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                {!privateUser ? (
                  <div>
                    <button
                      className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                      onClick={trackFollowers}
                    >
                      <span>{subscribeButtonText}</span>
                    </button>
                    <button className="bg-gradient-to-r from-dbeats-light  to-purple-900  p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white ">
                      <i className="fas fa-volleyball-ball mr-1"></i>
                      <span>Appreciate</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
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
            {userData ? (
              <div className="w-full">
                <hr />
                <h4>Description : </h4>
                <p>{userData.videos[0].description}</p>
                <hr />
              </div>
            ) : (
              <></>
            )}
            <div className={`${classes.comment_section}`}>
              <iframe
                className={`${classes.convo_frame}`}
                title="comment"
                src="https://theconvo.space/embed/dt?threadId=KIGZUnR4RzXDFheXoOwo"
                allowtransparency="true"
                loading="eager"
              />
            </div>
          </div>
        </div>
        <div className="  w-full col-span-1 px-5">
          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            {arrayData.map((value, index) => {
              return <RecommendedCard key={index} value={value} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playback;
