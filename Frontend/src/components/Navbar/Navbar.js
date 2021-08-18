import {useState} from 'react';
import classes from "./Navbar.module.css";
import {Navbar, FormControl,Modal, Button, Form, Spinner,Image} from "react-bootstrap";
import { scaleRotate as Menu } from 'react-burger-menu'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { userLogout, userSignIn } from '../../redux/action';


import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import logo from "../../assests/images/logo2.png"


const NavBar = (props) => {

    let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
    const AuthStr = 'Bearer '.concat(key); 

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();


    let history = useHistory();
    const [showOpen,setOnOpen]=useState(false);
    const [show, setShow] = useState(false);
    
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnOpen = () =>{
      setOnOpen(true);
    }

    const isMenuOpen = (state) => {
      setOnOpen(state.isOpen)
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleLogin = () =>{
      dispatch(userSignIn("test_user"));
    }

    const handleLogout = () =>{
      dispatch(userLogout());
      history.push('/home');
    }


    const createStream = async () => {
        setLoader(false);
        let streamData = {
            name: `${name}`,
            profiles: [
                {
                    name: "720p",
                    bitrate: 2000000,
                    fps: 30,
                    width: 1280,
                    height: 720,
                },
                {
                    name: "480p",
                    bitrate: 1000000,
                    fps: 30,
                    width: 854,
                    height: 480,
                },
                {
                    name: "36p",
                    bitrate: 500000,
                    fps: 30,
                    width: 640,
                    height: 360,
                },
            ]
        }

        const stream = await axios({
            method: 'post',
            url: 'https://livepeer.com/api/stream',
            data: streamData,
            headers: {
                'content-type': 'application/json',
                Authorization: AuthStr
            },
        });

        setLoader(true);
        let id = stream.data.id;

        history.push(`/streamer/${id}`);
    };

    return (
        <>
           <Menu
            customBurgerIcon={ false }
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            isOpen={ showOpen }
            onStateChange={ isMenuOpen }
          >
              <div className={classes.menu_items}>
                  <a id="home" href="#/home">
                      <i id={classes.menu_item} className="fa fa-fw fa-home" style={{ fontSize: '1em'}} />
                      <span className={classes.menu_item_name}> Home </span>
                  </a>
              </div>
              <div className={classes.menu_items}>
                  <a id="about" href="#/about">       
                  <i id={classes.menu_item} className="fas fa-compass" style={{ fontSize: '1em' }} />
                      <span className={classes.menu_item_name} style={{ paddingLeft: '15px' }}> Explorer </span>
                  </a>
              </div>
              <div className={classes.menu_items}>
                  <a id="contact"  href="#/contact">    
                      <i id={classes.menu_item} className="fas fa-cogs" style={{ fontSize: '1em' }} />                    
                      <span className={classes.menu_item_name}> Setting </span>
                  </a>
              </div>
              { user
                  ?  <div className={classes.menu_item_logout} onClick={handleLogout}>  
                        <i id={classes.menu_item} className="fas fa-door-open" style={{ fontSize: '1em' }} />                    
                        <span className={classes.menu_item_name}> Logout </span>                        
                    </div> 
                  : <> </>
              }
              
          </Menu>

          <Navbar expand="lg" id="navbarScroll" className={classes.body_navbar_style}>
                  <div>
                    <div className={classes.logo_details} onClick={() => (history.push('/home'))}>
                        <Image src={logo} className={classes.logo_image}/>
                        <span className={classes.logo_name}> Dbeats </span>
                    </div>
                  </div>
                  <div>
                    <div className={classes.nav_sidebar_button}>
                        <MenuIcon onClick={handleOnOpen}/>
                    </div>
                  </div>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{borderRadius:"20px",width:"100%"}}
                    />
                    <div className={classes.searchIcon}>
                          <SearchIcon />
                      </div>
                  </Form>
                  <div align="right">
                    {user 
                      ? <>
                          <Button variant="primary" className={classes.create_stream_url} onClick={handleShow}>
                              Create Stream
                          </Button>
                          <Button className={classes.navbar_meetId}> <AccountCircleIcon className={classes.navbar_avatar} /> <span>ox84...6485 </span></Button>
                        </>
                      : <Button variant="primary" className={classes.create_stream_url} onClick={handleLogin}>
                            Login
                        </Button>
                    }
                      
                  </div>
          </Navbar>

          <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Get Ready</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Streamer's Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="button" onClick={createStream}>
                            Start Streaming
                        </Button>
                        <Spinner animation="border" variant="info" role="status" hidden={loader}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default NavBar;
