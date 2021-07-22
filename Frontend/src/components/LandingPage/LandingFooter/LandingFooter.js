import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import discord from '../../../assests/images/discord.jpg';
import telegram from '../../../assests/images/telegram.png';
import twitter from '../../../assests/images/twitter.png';

const LandingFooter = () => {
    return (
        <div style={{paddingBottom:"50px",paddingTop:"50px"}}>
            <h5 className="text-center mt-5" style={{color:'#5e615f'}}>Livepeer Communities</h5>
            <h2 className="text-center join-text">Join the DBeats Community</h2>
            <p className="text-center" style={{color:'#5e615f'}}>DBeats is an open project that believes in open source code and <br/> creative contribution
                from people with diverse interests and skillsets. Join us.
            </p>
            <div>
                <Container>
                    <Row >
                        <Col md={8} className="mx-auto">
                            <Row>
                                <div className="socials">
                                    <div className="discord social">
                                        <img className="img-fluid" src={discord} alt="discord-social"/>
                                        <p>Join us on <a href="#">Discord</a></p>
                                    </div>
                                    <div className="telegram social">
                                        <img className="img-fluid" src={telegram} alt="telegram-social"/>
                                        <p>Contact us on <a href="#">Telegram</a></p>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                            <div className="socials">
                            <div className="twitter social">
                                        <img className="img-fluid" src={twitter} alt="twitter-social"/>
                                        <p>twitter.com/<a href="#">DBeats</a></p>
                                    </div>
                            </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default LandingFooter
