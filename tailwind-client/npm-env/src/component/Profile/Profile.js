import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import axios from "axios";
import CarouselCard from "./CarouselCard";
import person from "../../assets/images/person.png";

import { Modal } from "react-bootstrap";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import { PinterestShareButton, PinterestIcon } from "react-share";
import { TelegramShareButton, TelegramIcon } from "react-share";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Tab } from "@headlessui/react";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [privateUser, setPrivate] = useState(true);

  const [sharable_data, setSharable_data] = useState("");

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [buttonText, setButtonText] = useState("SUBSCRIBE");

  const myData = JSON.parse(window.localStorage.getItem("user"));

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const get_User = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/user/${props.match.params.username}`
      )
      .then((value) => {
        setUser(value.data);
        for (let i = 0; i < value.data.follower_count.length; i++) {
          if (value.data.follower_count[i] === myData.username) {
            setButtonText("UNSUBSCRIBE");
            break;
          }
        }
        setSharable_data(
          `https://dbeats-demo.vercel.app /profile/${value.data.username}`
        );
        setFollowers(value.data.follower_count.length);
        setFollowing(value.data.followee_count.length);
      });
  };

  console.log(user);
  const trackFollowers = () => {
    console.log(followers);
    const followData = {
      following: `${user.username}`,
      follower: `${myData.username}`,
    };
    if (buttonText === "SUBSCRIBE") {
      setButtonText("UNSUBSCRIBE");
      setFollowers(followers + 1);
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
            console.log(response);
          } else {
            alert("Invalid Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setButtonText("SUBSCRIBE");
      setFollowers(followers - 1);
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
            console.log(response);
          } else {
            alert("Invalid Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    let value = JSON.parse(window.localStorage.getItem("user"));
    console.log(value);
    if (value.username === props.match.params.username) {
      setUser(value);
      setSharable_data(
        `https://dbeats-demo.vercel.app /profile/${value.username}`
      );
      setPrivate(true);
      setFollowers(value.follower_count.length);
      setFollowing(value.followee_count.length);
    } else {
      get_User();
      setPrivate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user ? (
        <div>
          <div id="outer-container">
            <main id="page-wrap">
              <div className="flex w-full">
                <div className="w-250 bg-gray-300"></div>
                <div id="display_details" className="px-5 pt-3 w-full">
                  <div className="bg-white pb-3 ">
                    <div className="">
                      <div
                        className=" bg-profile-cover "
                        style={{ width: "100%", height: "22rem" }}
                      />
                    </div>
                    <div className="w-100">
                      <div className="w-100 flex -mt-28 ml-5">
                        <div className="w-56 ">
                          <div className="px-1 py-1 shadow-sm w-44 h-44   bg-white rounded-full   ">
                            <img
                              src={person}
                              alt=""
                              className="relative w-42 h-42 align-middle items-center  rounded-full "
                            />
                          </div>
                        </div>
                        <div className="w-100 flex flex-col ml-3 mr-5">
                          <div className="text-white pb-5 shadow">
                            <div className="flex w-max">
                              <span className="font-bold text-3xl mr-3">
                                {user.name}
                              </span>
                              {!privateUser ? (
                                <button
                                  href="#"
                                  className="no-underline cursor-pointer border-dbeats-light border-1  text-dbeats-light hover:bg-dbeats-light hover:text-white rounded font-bold mr-1 flex self-center   py-1 px-3"
                                  onClick={trackFollowers}
                                >
                                  <i class="fas fa-plus self-center"></i>
                                  &nbsp;{buttonText}
                                </button>
                              ) : (
                                <></>
                              )}
                              <button
                                onClick={handleShow}
                                className="no-underline cursor-pointer border-white border-1  text-blue-50 hover:bg-white hover:text-dbeats-light rounded font-bold mr-1 flex self-center   py-1 px-3"
                              >
                                <i className="fas fa-share-alt self-center mr-2 "></i>{" "}
                                SHARE
                              </button>
                            </div>
                            <span className="font-semibold">
                              @{user.username}
                            </span>
                          </div>
                          <div className="flex text-gray-400 py-3">
                            <div class="grid grid-flow-rows grid-cols-5   gap-4">
                              <div className="font-bold mx-auto   px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {user.videos ? user.videos.length : 0}{" "}
                                </span>
                                VIDEOS
                              </div>
                              <div className="font-bold mx-auto   px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {/*{user.subscribers ? <>{user.subscribers.length}</> : 0}{" "}*/}
                                  {followers}{" "}
                                </span>
                                FOLLOWERS
                              </div>
                              <div className="font-bold  mx-auto  px-4">
                                <span className="font-bold text-lg text-gray-700">
                                  {/*{user.subscribed ? <>{user.subscribed.length}</> : 0}{" "}*/}
                                  {following}{" "}
                                </span>
                                FOLLOWING
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full relative mb-20 ">
                    <Tab.Group>
                      <Tab.List className="flex px-1 space-x-1 bg-white   ">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ",
                              selected
                                ? "text-dbeats-light font-bold border-b-2 border-dbeats-light"
                                : "hover:bg-black/[0.12]  hover:text-gray-900"
                            )
                          }
                        >
                          VIDEOS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ",
                              selected
                                ? "text-dbeats-light font-bold border-b-2 border-dbeats-light"
                                : "hover:bg-black/[0.12]  hover:text-gray-900"
                            )
                          }
                        >
                          ALBUMS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ",
                              selected
                                ? "text-dbeats-light font-bold border-b-2 border-dbeats-light"
                                : "hover:bg-black/[0.12]  hover:text-gray-900"
                            )
                          }
                        >
                          PLAYLISTS
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full py-2.5 text-sm leading-5 font-semibold text-gray-400 text-md ",
                              selected
                                ? "text-dbeats-light font-bold border-b-2 border-dbeats-light"
                                : "hover:bg-black/[0.12]  hover:text-gray-900"
                            )
                          }
                        >
                          REPOSTS
                        </Tab>
                      </Tab.List>

                      <Tab.Panels className="bg-transparent">
                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="">
                          <div className="px-5 pt-10">
                            {user.videos ? (
                              <div>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <div key={i}>
                                      <CarouselCard
                                        playbackUserData={playbackUser}
                                        index={i}
                                        username={user.username}
                                        type="video"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p>No Videos till now</p>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div className="px-5 pt-10 h-72">Reposts</div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </main>

            <Modal show={show} onHide={handleClose} animation={true} centered>
              <Modal.Header closeButton>
                <Modal.Title>Share link on</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col className={classes.share_icons}>
                      <WhatsappShareButton
                        className={classes.icon}
                        url={sharable_data}
                      >
                        <WhatsappIcon
                          iconFillColor="white"
                          size={60}
                          round={true}
                        />
                      </WhatsappShareButton>
                      <FacebookShareButton
                        className={classes.icon}
                        url={sharable_data}
                      >
                        <FacebookIcon
                          iconFillColor="white"
                          size={60}
                          round={true}
                        />
                      </FacebookShareButton>
                      <EmailShareButton
                        className={classes.icon}
                        url={sharable_data}
                      >
                        <EmailIcon
                          iconFillColor="white"
                          size={60}
                          round={true}
                        />
                      </EmailShareButton>
                      <PinterestShareButton
                        className={classes.icon}
                        url={sharable_data}
                      >
                        <PinterestIcon
                          iconFillColor="white"
                          size={60}
                          round={true}
                        />
                      </PinterestShareButton>
                      <TelegramShareButton
                        className={classes.icon}
                        url={sharable_data}
                      >
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
                      className={classes.link_copy_btn}
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
