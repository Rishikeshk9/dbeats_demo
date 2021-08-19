import { useState } from "react";
import classes from "./Navbar.module.css";
import {
  Navbar,
  FormControl,
  Modal,
  Button,
  Form,
  Spinner,
  Image,
  Col
} from "react-bootstrap";
import { scaleRotate as Menu } from "react-burger-menu";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userSignIn } from "../../redux/action";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../assests/images/logo2.png";
import { ethers } from "ethers";
import useWeb3Modal from "../../hooks/useWeb3Modal";

const NavBar = (props) => {

  // Web3
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();


  //stream key and history elements
  let key = "d98e11c9-2267-4993-80da-6215d73b42c1";
  let history = useHistory();
  const AuthStr = "Bearer ".concat(key);

  
  // redux
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  
  
  //  Modal 
  const [showOpen, setOnOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);


  // Form varibles
  const [form_name, setName] = useState("");
  const [form_username, setUsername] = useState("");
  const [form_password, setPassword] = useState("");
  const [form_confirmPassword, setConfirmPassword] = useState("");


  // Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Sidebar functions
  const handleOnOpen = () => setOnOpen(true);
  const isMenuOpen = (state) => setOnOpen(state.isOpen);

  
  // Auth functions

  const handleLogout = () => {
    dispatch(userLogout());
    history.push("/home");
  };


  // Create a LivePeer Stream Profile
  const createStream = async () => {
    setLoader(false);
    let streamData = {
      name: `${form_name}`,
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
      ],
    };

    const stream = await axios({
      method: "post",
      url: "https://livepeer.com/api/stream",
      data: streamData,
      headers: {
        "content-type": "application/json",
        Authorization: AuthStr,
      },
    });

    let id = stream.data.id;
    console.log(stream)
    
    const userData={
      name:form_name,
      username:form_username,
      password:form_password,
      confirm_password:form_confirmPassword,
      meta_mask_id:provider.provider.selectedAddress,
      livepeer_data:stream.data,
    };
    console.log(userData);

    dispatch(userSignIn(provider.provider.selectedAddress));


    
    setLoader(true);
    //history.push(`/streamer/${id}`);
  };


  // Metamask Auth 
  function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {

    return (
      <div>
        <Button
          variant="primary" 
          type="button"
          size="lg"
          onClick={async() => {
            if (!provider) {
              let variable=await loadWeb3Modal();
              console.log(variable);
              setShow(true)
            } 
            else{
              setShow(true) 
            }
          }}
        >
          {!provider ? "Connect Your Wallet " : "Wallet Connected (Complete SignUp)"}
        </Button>
      </div>
    );
  }



  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  return (
    <>
      <Menu
        customBurgerIcon={false}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        isOpen={showOpen}
        onStateChange={isMenuOpen}
      >
        <div className={classes.menu_items}>
          <a id="home" href="#/home">
            <i
              id={classes.menu_item}
              className="fa fa-fw fa-home"
              style={{ fontSize: "1em" }}
            />
            <span className={classes.menu_item_name}> Home </span>
          </a>
        </div>
        <div className={classes.menu_items}>
          <a id="about" href="#/about">
            <i
              id={classes.menu_item}
              className="fas fa-compass"
              style={{ fontSize: "1em" }}
            />
            <span
              className={classes.menu_item_name}
              style={{ paddingLeft: "15px" }}
            >
              {" "}
              Explorer{" "}
            </span>
          </a>
        </div>
        <div className={classes.menu_items}>
          <a id="contact" href="#/contact">
            <i
              id={classes.menu_item}
              className="fas fa-cogs"
              style={{ fontSize: "1em" }}
            />
            <span className={classes.menu_item_name}> Setting </span>
          </a>
        </div>
        {user ? (
          <div className={classes.menu_item_logout} onClick={handleLogout}>
            <i
              id={classes.menu_item}
              className="fas fa-door-open"
              style={{ fontSize: "1em" }}
            />
            <span className={classes.menu_item_name}> Logout </span>
          </div>
        ) : (
          <> </>
        )}
      </Menu>

      <Navbar
        expand="lg"
        id="navbarScroll"
        className={classes.body_navbar_style}
      >
        <div>
          <div
            className={classes.logo_details}
            onClick={() => history.push("/home")}
          >
            <Image src={logo} className={classes.logo_image} />
            <span className={classes.logo_name}>DBeats</span>
          </div>
        </div>
        <div>
          <div className={classes.nav_sidebar_button}>
            <MenuIcon onClick={handleOnOpen} />
          </div>
        </div>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ borderRadius: "20px", width: "100%" }}
          />
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
        </Form>
        <div align="right">
          {user
            ? (
                <>
                  <Button
                    variant="primary"
                    className={classes.create_stream_url}
                  >
                    Go Live
                  </Button>
                  <Button className={classes.navbar_meetId}>
                    {" "}
                    <AccountCircleIcon className={classes.navbar_avatar} />{" "}
                    <span>{provider.provider.selectedAddress.slice(0,4)+'...'+provider.provider.selectedAddress.slice(-4)}</span>
                  </Button>
                </>
          ) : (
              <WalletButton
                  provider={provider}
                  loadWeb3Modal={loadWeb3Modal}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
              />
          )}
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
          <Modal.Title>Let's SignUp</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
              <Form.Group className="mb-3"controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  onChange={(e) => handleNameChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  onChange={(e) => handleUsernameChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter Password"
                  onChange={(e) => handlePasswordChange(e)} 
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm your Password" 
                  onChange={(e) => handleConfirmPasswordChange(e)}
                />
              </Form.Group>

              <div className="d-grid">
              {!provider 
                ? <WalletButton
                    provider={provider}
                    loadWeb3Modal={loadWeb3Modal}
                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                  />
                : <> 
                    <Button variant="primary" type="button" size="lg" width="100%" onClick={createStream}>
                      Continue
                    </Button>
                    <Spinner
                      animation="border"
                      variant="info"
                      role="status"
                      hidden={loader}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>  
                  </>

              }
              </div>

          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NavBar;
