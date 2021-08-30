import { useState } from "react";
import classes from "./Navbar.module.css";
import {
  Navbar,
  FormControl,  
  Button,
  Form,
  Image
} from "react-bootstrap";
import { scaleRotate as Menu } from "react-burger-menu";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../assests/images/logo2.png";
import useWeb3Modal from "../../hooks/useWeb3Modal";

const NavBar = (props) => {

  const [logoutOfWeb3Modal] = useWeb3Modal();
  

  let history = useHistory();
  
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  
  
  //  Modal 
  const [showOpen, setOnOpen] = useState(false);

  // Sidebar functions
  const handleOnOpen = () => setOnOpen(true);
  const isMenuOpen = (state) => setOnOpen(state.isOpen);

  
  // Auth functions

  const handleLogout = () => {
    window.sessionStorage.removeItem("user");
    logoutOfWeb3Modal()
    history.push("/home");
  };

  const handleStreamOnClick = () =>{
    history.push(`/streamer/${user.username}`)
  }

  const handleProfileOnClick = () =>{
    history.push(`/profile/${user.username}`)
  }

 // console.log(user, "from navbar")
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
                    onClick={handleStreamOnClick}
                  >
                    Go Live
                  </Button>
                  <Button 
                    className={classes.navbar_meetId}
                    onClick={handleProfileOnClick}
                  >
                    {" "}
                    <AccountCircleIcon className={classes.navbar_avatar} />{" "}
                    <span>{user.wallet_id.slice(0,4)+'...'+user.wallet_id.slice(-4)}</span>
                  </Button>
                </>
          ) : (
              <>
                <Button
                    variant="primary"
                    className={classes.create_stream_url} onClick= {()=> {history.push(`/login`)}}
                  >
                    Login
                  </Button>
              </>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
