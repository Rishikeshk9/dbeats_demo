import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import playimg from '../../../assests/images/telegram.png';
import axios from 'axios'
import VideoPlayer from  '../VideoPlayer/VideoPlayer'
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { WhatsappIcon, WhatsappShareButton} from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { Container, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PublicInfo = (props) => {
    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";

    let sharable_data = `Come Visit : https://dbeats-demo.vercel.app/#/public/${props.stream_id}`

    const [userStreams, setUserStreams] = useState([]);
    const [playbackUrl, setPlaybackUrl] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showMore, setShowMore] = useState(false);

    const handleCloseMore = () => setShowMore(false);
    const handleShowMore = () => setShowMore(true);

    const text = "Copy Link To Clipboard"
    const [buttonText, setButtonText] = useState(text);

    useEffect(() => {
        console.log(props.stream_id)
        
        const apiUrl = `https://livepeer.com/api/stream/${props.stream_id}`;
        const AuthStr = 'Bearer '.concat(key); 
        axios.get(apiUrl, { 
            headers: { 
                Authorization: AuthStr, 
            } 
        })
        .then((res) => {
          setUserStreams(res.data);
        });
    }, []);


    useEffect(() => {
        setPlaybackUrl(`https://cdn.livepeer.com/hls/${userStreams.playbackId}/index.m3u8`)
    }, [userStreams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonText(text);
        }, 2000);
        return () => clearTimeout(timer);
    }, [buttonText])


    return (
        <Fragment>
            <div className={classes.info_main_body}>
                <div id={classes.info_main_body_set}>
                    <div>                        
                        <VideoPlayer 
                            playbackUrl="https://fra-cdn.livepeer.com/recordings/5a0bf957-ca7b-4d61-885f-fa24c27ca035/index.m3u8"
                           
                        />
                    </div>
                    
                    <div className={classes.info_localDisplay_features}>
                        <div>
                            <div className={classes.info_remoteVideo_text} style={{padding:"0px"}}>
                                <h4>Drake Songs</h4>
                                <p>Rap Songs</p>
                            </div>
                            <button className={classes.info_subscribe_button}>
                                <span>Subscribe</span>
                            </button>
                            <button className={classes.info_apprecite_button}>
                                <i className="fas fa-volleyball-ball"></i>
                                <span>Apprecite</span>
                            </button>
                        </div>
                        <div className={classes.info_localDisplay_icons}>
                        <button  className={classes.share_btn}
                        onClick={handleShow}><i className="fas fa-share"></i></button>
                            <i className="fas fa-heart"></i>
                            <i className="fas fa-heart-broken"></i>
                            <i className="far fa-laugh-squint"></i>
                            <i className="far fa-angry"></i>
                            <button  className={classes.more_options}
                        onClick={handleShowMore}><i className="fas fa-ellipsis-h"></i></button>
                        </div>
                        <Modal show={show}
        onHide={handleClose} 
        animation={true}
        centered>
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

                     <div className={classes.comment_section}>
                        <iframe className={classes.convo_frame} src="https://theconvo.space/embed/t/KIGZUnR4RzXDFheXoOwo" allowtransparency="true"/>
                    </div>    
                </div>
                <div className={classes.info_short_section}>
                    {/* {peers.map((peer, index) => {
                        peer.on("stream", (stream) => {
                            ref.current.srcObject = stream;
                        });
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
                    })} */}
                    <h5>Playlist</h5>
                   <div className={classes.playlist}>
                       <img src={playimg} className={classes.playlist_img} alt="img"></img>
                       <div className={classes.playlist_name}>
                           <h3>Drake Songs</h3>
                           <p>Rap song</p>
                       </div>
                       <i className="fas fa-info-circle" style={{display:"block", marginLeft:"auto", 
                        marginTop:"10px", marginRight:"10px", fontSize:"medium"} }>
                       </i>
                   </div>
                   <div className={classes.playlist}>
                       <img className={classes.playlist_img} src={playimg} alt="img"></img>
                       <div className={classes.playlist_name}>
                           <h3>Drake Songs</h3>
                           <p>Rap song</p>
                       </div>
                       <i className="fas fa-info-circle" style={{display:"block", marginLeft:"auto", 
                        marginTop:"10px", marginRight:"10px", fontSize:"medium"} }>
                       </i>
                   </div>
                   
                </div>
            </div>

        </Fragment>
    );
};

export default PublicInfo;
