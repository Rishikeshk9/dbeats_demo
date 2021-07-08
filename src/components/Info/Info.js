import React, { Fragment, useEffect, useState } from "react";
import adapter from 'webrtc-adapter';
import classes from "./Info.module.css";

const Info = () => {

  const [localVideoRef, setLocalVideoRef] = useState(React.createRef());
  const [remoteVideoRef, setRemoteVideoRef] = useState(React.createRef())
  const [flag,setFlag] = useState(false)
  const [counts,setCount] = useState([1,2,3,4])

  


  let constraints = { video: true };

  
  //---------------- Video Permission

  // const success = (stream) => {
  //   localVideoRef.current.srcObject = stream;
  // };

  // const failure = (e) => {
  //   console.log("getUserMedia Error: ", e);
  // };

  const createOffer =() =>{
    constraints.video=false;
  }

  const createAnswer =() =>{
    
  }

  //navigator.mediaDevices.getUserMedia(constraints).then(success).catch(failure);

  


  //------------Screen Share 

  const handleSuccess = (stream) => {
    setFlag(true);
    const video = document.querySelector('video');
    video.srcObject = stream;

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      errorMsg('The user has ended sharing the screen');
      setFlag(false);
    });
  }

  const handleError = (error) => {
    errorMsg(`getDisplayMedia error: ${error.name}`, error);
  }

  const errorMsg = (msg, error) => {
      console.error(error);
  }

  const createShare =() =>{

    // if (adapter.browserDetails.browser == 'chrome') {
    //   adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    // }

    navigator.mediaDevices.getDisplayMedia(constraints)
        .then(handleSuccess,handleError);

    if ((navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
      setFlag(false);
    } else {
      errorMsg('getDisplayMedia is not supported');
    }
  }  

  

  return (
    <Fragment>
        <div className={classes.info_main_body}>
          <div> 
              <div className={classes.info_localDisplay}>             
                <video 
                  id="gum-local" 
                  autoPlay playsInline muted></video>
              </div>
              <div className={classes.info_localDisplay_controls}>
                <button onClick={createShare} disabled={flag}>Start</button>
                <button onClick={createShare} disabled={flag}>Start</button>
                <button onClick={createShare} disabled={flag}>Start</button>
                <button onClick={createShare} disabled={flag}>Start</button>
              </div>
              <div className={classes.info_localDisplay_features}>
                <div>
                  <button className={classes.info_subscribe_button} onClick={createOffer}>
                    <span>Subscribe</span>
                  </button>
                  <button className={classes.info_apprecite_button} onClick={createAnswer}>
                    <i class="fas fa-volleyball-ball"></i><span>Apprecite</span>
                  </button>
                </div>
                <div className={classes.info_localDisplay_icons}>
                  <i class="fas fa-share"></i>
                  <i class="fas fa-heart"></i>
                  <i class="fas fa-heart-broken"></i>
                  <i class="far fa-laugh-squint"></i>
                  <i class="far fa-angry"></i>
                  <i class="fas fa-ellipsis-h"></i>
                </div>
              </div> 
          </div>
          <div className={classes.info_short_section}>

            {counts.map((count,index) => (
              <div id={index} className={classes.info_short_section_details}>
                   <div>
                     <video
                       className={classes.info_remoteVideo}
                       ref={remoteVideoRef}
                       autoPlay
                     ></video>
                   </div>
                   <div className={classes.info_remoteVideo_text}>
                     <h4>Title</h4>
                     <p>Description</p>
                     <span>Tags</span>
                   </div>
              </div>
            ))}
          </div>
        </div>

    </Fragment>
  );
};

export default Info;
