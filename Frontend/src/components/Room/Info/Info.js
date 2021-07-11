import React, { useRef,Fragment, useEffect, useState } from "react";
import adapter from 'webrtc-adapter';
import classes from "./Info.module.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import {useDispatch, useSelector} from 'react-redux'

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
};


const Info = (props) => {

  const meetId = useSelector((store) => store);
  // const dispatch = useDispatch();

  console.log(meetId);

  // const [localVideoRef, setLocalVideoRef] = useState(React.createRef());
  // const [remoteVideoRef, setRemoteVideoRef] = useState(React.createRef())
    const [flag,setFlag] = useState(false)
  // const [counts,setCount] = useState([1,2,3,4])

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = meetId;
    const ref = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    const createPeer = (userToSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, callerID, stream)=>{
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

  

  return (
    <Fragment>
        <div className={classes.info_main_body}>
          <div> 
              <div className={classes.info_localDisplay}>             
                <video 
                  id="gum-local" 
                  ref={userVideo}
                  autoPlay playsInline muted></video>
              </div>
              <div className={classes.info_localDisplay_controls}>
                <button  disabled={flag}>Start</button>
                <button  disabled={flag}>Start</button>
                <button  disabled={flag}>Start</button>
                <button  disabled={flag}>Start</button>
              </div>
              <div className={classes.info_localDisplay_features}>
                <div>
                  <button className={classes.info_subscribe_button}>
                    <span>Subscribe</span>
                  </button>
                  <button className={classes.info_apprecite_button}>
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

            {peers.map((peer, index) => {
                

                peer.on("stream", stream => {
                  ref.current.srcObject = stream;
                })
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
            })}
          </div>


        </div>

    </Fragment>
  );
};

export default Info;
