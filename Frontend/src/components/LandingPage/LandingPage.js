import React from 'react'
import { Fragment } from 'react'
import LandingBody from './LandingBody/LandingBody'
import LandingFooter from './LandingFooter/LandingFooter'
import earthImg from '../../assests/images/earth.png'
import logo from "../../assests/images/logo.png"
import Particles from 'react-particles-js';


import {
    Nav,
    Image
} from 'react-bootstrap'
import classes from './Landing.module.css'

const LandingPage = () => {
    return (
        <Fragment>
            <div style={{ backgroundColor: "#000" }}>
                <Particles
                    width="100%"
                    height="80vh"
                    params={{
                        "particles": {
                            "number": {
                                "value": 80,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "speed": 4,
                                    "size_min": 0.3
                                }
                            },
                            "line_linked": {
                                "enable": false
                            },
                            "move": {
                                "random": true,
                                "speed": 1,
                                "direction": "top",
                                "out_mode": "out"
                            }
                        }
                    }}
                    style={{ position: "fixed" }}
                />
                <div className={classes.main_header_nav} id="main_header_nav">
                    <Nav className="justify-content-between" activeKey="/">
                        <div>
                            <Nav className={classes.main_header_navitems}>
                                <Nav.Item>
                                    <Nav.Link href="/">
                                        <div className={classes.nav_logo_style}>
                                            <Image src={logo} height="auto" width="130px" />
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link className={classes.main_header_navitem} href="/">More Details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={classes.main_header_navitem} href="/">Visit Us</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Nav>
                </div>
                <center>
                    <div className={classes.main_header_title} id="main_header_title">
                        <p>INDEPENDENT NETWORK FOR INDEPENDENT CREATEOR</p>
                    </div>
                </center>
                <div>
                    <div className={classes.main_header_body} id="main_header_body" style={{ backgroundImage: `url(${earthImg})` }}>
                    </div>
                </div>
            </div>
            <LandingBody />
            <LandingFooter />
        </Fragment>
    )
}

export default LandingPage
