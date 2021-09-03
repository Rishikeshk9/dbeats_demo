import React, { useState } from "react";
import classes from "./Profile.module.css";
import NavBar from "../Navbar/Navbar";
//import axios from "axios";
import Carousel from "react-grid-carousel";
import CarouselCard from "./CarouselCard";
import wallpaper from '../../assests/images/wallpaper.jpeg'
import person from '../../assests/images/person.jpg'

import { Modal, ListGroup } from 'react-bootstrap';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Tab } from '@headlessui/react'


const Profile = (props) => {

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  let sharable_data = `http://localhost:3000/#/public_profile/${user.username}`

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = "Copy Link To Clipboard"
  const [buttonText, setButtonText] = useState(text);

  console.log(user.subscribers);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div>
        <NavBar />
        <div id="outer-container">
          <main id="page-wrap" >
            <div className="flex w-full">
              <div className="w-250 bg-gray-300">

              </div>
              <div id="display_details" className="px-10 pt-3 w-full">

                <div className="bg-white p-4 rounded-t-lg">
                  <div className="">
                    <img className="rounded-xl" src={wallpaper} alt="avatar" style={{ width: "100%", height: "22rem" }} />
                  </div>
                  <div className="w-100">
                    <div className="w-100 flex -mt-28 ml-5">
                      <div className="w-56 ">
                        <div className="shadow-lg rounded-full bg-white py-1">
                          <img src={person} alt="" className="relative w-40 h-40 rounded-full mx-auto my-1" />
                        </div>
                      </div>
                      <div className="w-100 flex flex-col ml-3 mr-5">
                        <div className="text-white pb-5">
                          <span className="font-bold text-4xl">{user.name}</span> <br />
                          <span>@{user.username}</span>
                        </div>
                        <div className="flex text-gray-400 py-3">
                          <div className="font-bold mx-auto  px-4">
                            <span className="font-bold text-4xl text-gray-700">{user.videos.length} </span>
                            Videos
                          </div>
                          <div className="font-bold mx-auto  px-4">
                            <span className="font-bold text-4xl text-gray-700">{user ? <>{user.subscribers.length}</> : 0} </span>
                            Subscribers
                          </div>
                          <div className="font-bold mx-auto  px-4">
                            <span className="font-bold text-4xl text-gray-700">{user ? <>{user.subscribed.length}</> : 0} </span>
                            Subscribed
                          </div>
                          <button className="font-bold mx-auto  px-4" onClick={handleShow}>
                            <span className="font-bold text-4xl text-gray-700"><i class="fas fa-share"></i> </span>
                            Share
                          </button>
                          <div className="font-bold text-white bg-dbeats-light rounded-full mx-auto py-2 px-4">
                            <span className="font-bold pr-2 text-lg">+</span>
                            Follow
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full relative mb-20">
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-white rounded-b-lg">
                      <Tab className={({ selected }) =>
                        classNames(
                          'w-full py-2.5 text-sm leading-5 font-semibold text-gray-500 text-md rounded-lg',
                          selected
                            ? 'text-gray-900 bg-white shadow'
                            : 'hover:bg-black/[0.12]  hover:text-gray-900'
                        )
                      }>Videos</Tab>

                      <Tab className={({ selected }) =>
                        classNames(
                          'w-full py-2.5 text-sm leading-5 font-semibold text-gray-500 text-md rounded-lg',
                          selected
                            ? 'text-gray-900 bg-white shadow'
                            : 'hover:bg-black/[0.12]  hover:text-gray-900'
                        )
                      }>Albums</Tab>

                      <Tab className={({ selected }) =>
                        classNames(
                          'w-full py-2.5 text-sm leading-5 font-semibold text-gray-500 text-md rounded-lg',
                          selected
                            ? 'text-gray-900 bg-white shadow'
                            : 'hover:bg-black/[0.12]  hover:text-gray-900'
                        )
                      }>Playlists</Tab>

                      <Tab className={({ selected }) =>
                        classNames(
                          'w-full py-2.5 text-sm leading-5 font-semibold text-gray-500 text-md rounded-lg',
                          selected
                            ? 'text-gray-900 bg-white shadow'
                            : 'hover:bg-black/[0.12]  hover:text-gray-900'
                        )
                      }>Reports</Tab>
                    </Tab.List>

                    <Tab.Panels className="bg-transparent">

                      <Tab.Panel className="">
                        <div className="px-5 pt-10">
                          {user.videos
                            ? <div>{user.videos.map((playbackUser, i) => {
                              //console.log(playbackUser)
                              return (
                                <div key={i}>
                                  <CarouselCard playbackUserData={playbackUser} index={i} username={user.username} type="video" />
                                </div>
                              );
                            })}
                            </div>
                            : <p>No Videos till now</p>
                          }
                        </div>
                      </Tab.Panel>

                      <Tab.Panel className="">
                        <div className="px-5 pt-10">
                          {user.videos
                            ? <div>{user.videos.map((playbackUser, i) => {
                              //console.log(playbackUser)
                              return (
                                <div key={i}>
                                  <CarouselCard playbackUserData={playbackUser} index={i} username={user.username} type="video" />
                                </div>
                              );
                            })}
                            </div>
                            : <p>No Videos till now</p>
                          }
                        </div>
                      </Tab.Panel>

                      <Tab.Panel className="">
                        <div className="px-5 pt-10">
                          {user.videos
                            ? <div>{user.videos.map((playbackUser, i) => {
                              //console.log(playbackUser)
                              return (
                                <div key={i}>
                                  <CarouselCard playbackUserData={playbackUser} index={i} username={user.username} type="video" />
                                </div>
                              );
                            })}
                            </div>
                            : <p>No Videos till now</p>
                          }
                        </div>
                      </Tab.Panel>

                      <Tab.Panel>
                        <div className="px-5 pt-10 h-72">
                          Reports
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>

              </div>

            </div>
          </main>
          <Modal show={show}
            onHide={handleClose}
            animation={true}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Share link on</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col className={classes.share_icons} >
                    <WhatsappShareButton className={classes.icon}
                      url={sharable_data}>
                      <WhatsappIcon iconFillColor="white" size={60} round={true} />
                    </WhatsappShareButton>
                    <FacebookShareButton className={classes.icon}
                      url={sharable_data}>
                      <FacebookIcon iconFillColor="white" size={60} round={true} />
                    </FacebookShareButton>
                    <EmailShareButton className={classes.icon} url={sharable_data}>
                      <EmailIcon iconFillColor="white" size={60} round={true} />
                    </EmailShareButton>
                    <PinterestShareButton className={classes.icon} url={sharable_data}>
                      <PinterestIcon iconFillColor="white" size={60} round={true} />
                    </PinterestShareButton>
                    <TelegramShareButton className={classes.icon} url={sharable_data}>
                      <TelegramIcon iconFillColor="white" size={60} round={true} />
                    </TelegramShareButton>
                  </Col>
                </Row>
                <Row>
                  <CopyToClipboard text={sharable_data} className={classes.link_copy_btn}>
                    <button
                      type="submit"
                      onClick={() => setButtonText("Link Copied!")}>
                      {buttonText}
                    </button>
                  </CopyToClipboard>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Profile;
