import React, { useState, useEffect } from "react";
//import { Button } from "react-bootstrap";
import classes from "./Profile.module.css";
import NavBar from "../Navbar/Navbar";
import axios from "axios";

//import { Avatar } from "@material-ui/core";

const Profile = (props) => {

  const [arrayData, setArrayData] = useState([]);
  const userName=props.match.params.username;
 
  
  useEffect(() => {

    setArrayData([]);
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setArrayData([]);
    const userData = await axios.get(
      `https://dbeats-host-heroku.herokuapp.com/user/${userName}`
    );
    setArrayData((prevState) => [...prevState, userData]);
    
  };

    console.log(arrayData, "Hi");


  return (
    <>
      <div>
        <NavBar />
        <div id="outer-container" style={{ height: "100vh" }}>
          <main id="page-wrap" className={classes.main_homepage_body}>
            <div id="display_videos" className={classes.display_data_section}>
              <p>Username :</p>
              <p>Name :</p>
              <p>StreamKey :</p>
              <p>StreamID :</p>
              <p>Followers :</p>
              <p>Following :</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
