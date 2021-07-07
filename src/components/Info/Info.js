import React, { Fragment, useEffect, useState } from "react";
import adapter from 'webrtc-adapter';
import "./Info.css";

const Info = () => {

  const [localVideoRef, setLocalVideoRef] = useState(React.createRef());
  const [remoteVideoRef, setRemoteVideoRef] = useState(React.createRef())
  const [flag,setFlag] = useState(false)

  let constraints = { video: true };

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

  const handleSuccess = (stream) => {
    setFlag(true);
    const video = document.querySelector('video');
    video.srcObject = stream;

    stream.getVideoTracks()[0].addEventListener('ended', () => {
      errorMsg('The user has ended sharing the screen');
      setFlag(false);
    });

    if ((navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
      setFlag(false);
    } else {
      errorMsg('getDisplayMedia is not supported');
    }
  }

  const handleError = (error) => {
    errorMsg(`getDisplayMedia error: ${error.name}`, error);
  }

  const errorMsg = (msg, error) => {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  const createShare =() =>{

    // if (adapter.browserDetails.browser == 'chrome') {
    //   adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    // }

    navigator.mediaDevices.getDisplayMedia(constraints)
        .then(handleSuccess,handleError);
  }  

  

  return (
    <Fragment>
        <div className="main_body">
          <div>              
              <video 
                id="gum-local" 
                autoPlay playsInline muted></video>

              <button onClick={createShare} disabled={flag}>Start</button>
              <div id="errorMsg"></div>

              <div>
                <button onClick={createOffer}>Offer</button>
                <button onClick={createAnswer}>Offer</button>
              </div> 
          </div>
          <div className="short_section">
              <div>
                
              </div>
              <div>
                
              </div>
          </div>
        </div>

    </Fragment>
  );
};

export default Info;
