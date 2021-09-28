import React, { useEffect, useState, Fragment } from "react";
import classes from "./Info.module.css";
//import playimg from "../../../assets/images/telegram.png";
import axios from "axios";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Menu, Transition } from "@headlessui/react";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import { PinterestShareButton, PinterestIcon } from "react-share";
import { TelegramShareButton, TelegramIcon } from "react-share";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RecommendedCard from "./RecommendedCard";
import Modal from "react-awesome-modal";

const PlayBackInfo = (props) => {
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

  // const SuperfluidSDK = require("@superfluid-finance/js-sdk");
  // const { Web3Provider } = require("@ethersproject/providers");

  // const sf = new SuperfluidSDK.Framework({
  //   ethers: new Web3Provider(window.ethereum),
  // });

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
          if (user ? value.data.follower_count[i] === user.username : false) {
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
      if (fileRes.data.array[i].videos) {
        if (user ? fileRes.data.array[i].username === user.username : false) {
          continue;
        }
        if (
          fileRes.data.array[i].username !== props.stream_id &&
          fileRes.data.array[i].videos.length > 0
        ) {
          setArrayData((prevState) => [...prevState, fileRes.data.array[i]]);
        }
      }
    }
    //console.log(fileRes, "Hi");
    //await sf.initialize();
  };

  const handlereaction = (props) =>{
    const reactionData = {
      reactusername: `${userData.username}`,
      videousername: `${user.username}`,
      reaction: props,
      videoname: playbackUrl
    };
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/user/reactions`,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: reactionData,
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

  useEffect(() => {
    get_User();
    fetchData();
    let value = JSON.parse(window.localStorage.getItem("user"));
    console.log(value);
    if (user ? value.username === props.stream_id : false) {
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
              <div className="py-4">
                <div
                  className=" w-full text-left mt-0"
                  style={{ padding: "0px" }}
                >
                  {userData ? (
                    <p className="font-semibold text-xl pb-4">
                      {userData.videos[0].videoName}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                {!privateUser ? (
                  <div>
                    {user ? (
                      <button
                        className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                        onClick={trackFollowers}
                      >
                        <span>{subscribeButtonText}</span>
                      </button>
                    ) : (
                      <button
                        className="bg-dbeats-light p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white "
                        onClick={() => {
                          window.location.href = "/login";
                        }}
                      >
                        <span>Login</span>
                      </button>
                    )}
                    <button className="bg-gradient-to-r from-dbeats-light  to-purple-900  p-1 text-lg rounded-sm px-4 mr-3 font-semibold text-white ">
                      <i className="fas fa-volleyball-ball mr-1"></i>
                      <span>Appreciate</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="text-4xl py-4">
                <button
                  className="border-0 bg-transparent"
                  onClick={handleShow}
                >
                  <i className="fas fa-share opacity-50 mx-2"></i>
                </button>
                <i className="fas fa-heart opacity-50 mx-2" onClick={()=>handlereaction("like")}></i>
                <i className="fas fa-heart-broken opacity-50 mx-2" onClick={()=>handlereaction("Dislike")}></i>
                <i className="far fa-laugh-squint opacity-50 mx-2" onClick={()=>handlereaction("Happy")}></i>
                <i className="far fa-angry opacity-50 mx-2"onClick={()=>handlereaction("Angry")}></i>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <i className="fas fa-ellipsis-h opacity-50 mx-2"></i>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Edit</button>
                        </Menu.Item>
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Duplicate</button>
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Archive</button>
                        </Menu.Item>
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Move</button>
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                          <button>Delete</button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            {userData ? (
              <div className="w-full">
                <hr />
                <h4 className="py-2">Description : </h4>
                <p className="pb-2">{userData.videos[0].description}</p>
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
        <div className="  w-full col-span-1 px-5 pt-3">
          <div className=" w-full  grid grid-cols-1 grid-flow-row gap-3  ">
            {arrayData.map((value, index) => {
              return <RecommendedCard key={index} value={value} />;
            })}
          </div>
        </div>
      </div>
      <Modal
        visible={show}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4">
          <div className="col-span-4 pl-14">Share link on</div>
          <div className="ml-5" onClick={handleClose}>
            <i class="fas fa-times"></i>
          </div>
        </h2>
        <hr className="py-4" />
        <div>
          <Container className="px-12 pb-4">
            <Row>
              <Col className="flex justify-around align-center">
                <WhatsappShareButton url={sharable_data}>
                  <WhatsappIcon iconFillColor="white" size={60} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton url={sharable_data}>
                  <FacebookIcon iconFillColor="white" size={60} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={sharable_data}>
                  <EmailIcon iconFillColor="white" size={60} round={true} />
                </EmailShareButton>
                <PinterestShareButton url={sharable_data}>
                  <PinterestIcon iconFillColor="white" size={60} round={true} />
                </PinterestShareButton>
                <TelegramShareButton url={sharable_data}>
                  <TelegramIcon iconFillColor="white" size={60} round={true} />
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
        </div>
        <hr className="py-2" />
      </Modal>
    </div>
  );
};

export default PlayBackInfo;
