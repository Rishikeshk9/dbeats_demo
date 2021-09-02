import React from "react";
import classes from "./Profile.module.css";
import NavBar from "../Navbar/Navbar";
//import axios from "axios";
import Carousel from "react-grid-carousel";
import CarouselCard from "./CarouselCard";
import wallpaper from '../../assests/images/wallpaper.jpeg'
import person from '../../assests/images/person.jpg'


const Profile = (props) => {

  const user = JSON.parse(window.sessionStorage.getItem("user"));
 
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
                  <div className="z-0">
                    <div className="z-0">
                      <img className="rounded-xl" src={wallpaper} alt="avatar" style={{width:"100%",height:"300px"}}/>
                    </div>
                    <div className={classes.profile_pic}>
                      <div className="rounded-full">
                         <img src={person} alt="" className="w-40 h-40 rounded-full ring-4 ring-black"/>
                      </div>
                    </div>
                  </div>
                  <div>

                    <p>Username : {user.username}</p>
                    <p>Name : {user.name}</p>
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
        </div>
      </div>
    </>
  );
};

export default Profile;
