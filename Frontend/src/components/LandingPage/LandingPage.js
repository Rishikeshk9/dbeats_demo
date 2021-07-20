import React from 'react'
import { Fragment } from 'react'
import LandingBody from './LandingBody/LandingBody'
import LandingFooter from './LandingFooter/LandingFooter'
import earthImg from '../../images/earth.png'
import logo from "../../images/logo.png"
import Fade from 'react-reveal/Fade';

import { 
    Nav,
    Image 
} from 'react-bootstrap'
import classes from './Landing.module.css'

const LandingPage = () => {
    return (
        <Fragment >
            <div className={classes.main_body_vanta} id="main_body_vanta">
                <div className={classes.main_header_nav}>
                    <Nav className="justify-content-between" activeKey="/home">
                        <div>
                            <Nav className={classes.main_header_navitems}>
                                <Nav.Item>
                                    <Nav.Link href="/home">
                                        <div className="logo_style">
                                            <Image src={logo} height="45px" width="auto"/>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>                        
                            </Nav>
                        </div>
                        <div>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link className={classes.main_header_navitem} href="/home">More Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={classes.main_header_navitem}href="/home">Visit Us</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </div>
                    </Nav>
                </div>
                <div className={classes.main_header_body}>
                    <Image src={earthImg} className={classes.main_header_image}/>
                </div>
                <center>
                <div className={classes.main_header_title} id="header_title">
                      <p>INDEPENDENT NETWORK FOR INDEPENDENT CREATEOR</p>
                </div>
                </center>
            </div>
            <LandingBody />
            <LandingFooter />
        </Fragment>
    )
}

export default LandingPage
