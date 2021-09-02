import React,{useState, useEffect} from 'react';
import classes from "./Profile.module.css";
import NavBar from "../Navbar/Navbar";
import axios from "axios";
import Carousel from "react-grid-carousel";
import CarouselCard from "./CarouselCard";
import wallpaper from '../../assests/images/wallpaper.jpeg'
import person from '../../assests/images/person.jpg'


import { Modal, ListGroup } from 'react-bootstrap';
import { WhatsappIcon, WhatsappShareButton} from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const PublicProfile = (props) => {

  const username = props.match.params.username;

  let sharable_data = `http://localhost:3000/#/public_profile/${username}`

  // const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const text = "Copy Link To Clipboard"
  // const [buttonText, setButtonText] = useState(text);

  useEffect(() => {
    console.log(`${process.env.REACT_APP_SERVER_URL}/user/${props.match.params.username}`)
    
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  return (
    <>
      <div>
        <NavBar />
        <div id="outer-container" style={{ height: "100vh" }}>
          <main id="page-wrap" className="">
            <div className="flex">
                <div className="w-250 bg-gray-300">

                </div>
                <div id="display_videos" className="px-10 py-5 ">
                  
                  <div className="bg-white p-4">
                    <div className="">
                      <img className="rounded-xl" src={wallpaper} alt="avatar" style={{width:"100%",height:"300px"}}/>
                    </div>
                    <div>
                      <div className="w-100 flex -mt-28 ml-5">
                          <div className="w-56 ">
                            <div className="shadow-lg rounded-full bg-white py-1">
                                <img src={person} alt="" className="relative w-40 h-40 rounded-full mx-auto my-1"/>
                            </div>                              
                         </div>
                         <div className="w-100 flex flex-col ml-3 mr-5">
                            <div className="text-white pb-5">
                              <span className="font-bold text-4xl">{user.name}</span> <br/ >
                              <span>@{user.username}</span>
                            </div>
                            <div className="flex text-gray-400 py-3">
                              <div className="font-bold mx-auto  px-4"> 
                                <span className="font-bold text-4xl text-gray-700">{user.videos.length} </span> 
                                 Videos
                              </div>                              
                              <div className="font-bold mx-auto  px-4"> 
                                <span className="font-bold text-4xl text-gray-700">{user.followee_count} </span>
                                Following
                              </div>
                              <div className="font-bold mx-auto  px-4"> 
                                <span className="font-bold text-4xl text-gray-700">{user.followee_count} </span>
                                Followers
                                </div>
                              <button className="font-bold mx-auto  px-4"> 
                                <span className="font-bold text-4xl text-gray-700"><i class="fas fa-share"></i> </span>
                                Share
                              </button>
                              <div className="font-bold text-white bg-dbeats-light rounded-full mx-auto py-2 px-4"> 
                                <span className="font-bold">{user.followee_count}</span> 
                                Follow
                              </div>
                            </div>
                         </div>
                      </div>
                      
                    </div>
                  </div>

                  <div>

                    <p>Username : </p>
                    <p>Name : </p>
                    <p>Wallet Id : {user.wallet_id}</p>
                    <p>Following : {user.followee_count}</p>
                    <p>Followers : {user.follower_count}</p>
                    <hr />

                    <div>
                      <h4>My Subscribers :</h4>
                      {user.subscriberss
                        ? <div>
                              {user.subscribers.map((sub_name, i) => {
                                //console.log(playbackUser)
                                return (
                                  <div>
                                    Username : {sub_name.username}
                                  </div>
                                );
                              })}
                          </div>
                        : <p>No Subscribers</p>
                      }
                      
                    </div>
                    <hr />
                    <div>
                      <h4>I Subscribed :</h4>
                      {user.subscribed
                        ? <div>
                              {user.subscribed.map((sub_name, i) => {
                                //console.log(playbackUser)
                                return (
                                  <div>
                                    Username : {sub_name.username}
                                  </div>
                                );
                              })}
                          </div>
                        : <p>Not Subscribed any user</p>
                      }
                      
                    </div>
                    <hr />

                    <div>
                      <h4>My videos </h4>
                      {user.videos
                        ? <Carousel cols={4}>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <Carousel.Item key={i}>
                                      <CarouselCard playbackUserData={playbackUser} index={i} username={user.username} type="video"/>
                                    </Carousel.Item>
                                  );
                                })}
                          </Carousel>
                        : <p>No Videos till now</p>
                      }
                      
                    </div>
                    <hr />

                    <div>
                      <h4>My Tracks </h4>
                      {user.tracks
                        ? <Carousel cols={4}>
                                {user.videos.map((playbackUser, i) => {
                                  //console.log(playbackUser)
                                  return (
                                    <Carousel.Item key={i}>
                                      <CarouselCard playbackUserData={playbackUser} index={i} username={user.username} type="track"/>
                                    </Carousel.Item>
                                  );
                                })}
                          </Carousel>
                        : <p>No Tracks till now</p>
                      }
                    </div>

                  </div>
                  
                </div>

            </div>
          </main>
          {/*<Modal show={show}
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
                          <WhatsappIcon iconFillColor="white" size={60} round={true}/>
                      </WhatsappShareButton>
                      <FacebookShareButton className={classes.icon}
                      url={sharable_data}>
                          <FacebookIcon iconFillColor="white" size={60} round={true}/>
                      </FacebookShareButton>
                      <EmailShareButton className={classes.icon} url={sharable_data}>
                          <EmailIcon iconFillColor="white" size={60} round={true} />
                      </EmailShareButton>
                      <PinterestShareButton className={classes.icon} url={sharable_data}>
                          <PinterestIcon iconFillColor="white" size={60} round={true} />
                      </PinterestShareButton>
                      <TelegramShareButton className={classes.icon} url={sharable_data}>
                          <TelegramIcon iconFillColor="white" size={60} round={true}/>
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
          </Modal>*/}
        </div>
      </div>
    </>
  );
};

export default PublicProfile;
