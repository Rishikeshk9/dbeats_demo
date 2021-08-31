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

import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode} from '../../redux/Actions/index'

const NavBar = (props) => {

  const [logoutOfWeb3Modal] = useWeb3Modal();
  

  let history = useHistory();
  
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const dispatch=useDispatch();
  const darkMode= useSelector((state)=> state.toggleDarkMode);
  
  
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

      

      <div expand="lg" id="navbarScroll" className={` w-full ${darkMode && "dark"}`}>
        <div
          className={`bg-white  shadow-sm w-full relative flex  p-4 dark:bg-dbeats-dark dark:text-blue-300`}
        >

          <div className='flex w-full'>
            <div id="side-bar" className="mx-5 mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
            </div>
            <div id="logo">
                <img src={logo} alt="dbeats_logo" className="h-9 w-max"></img>
            </div>
          </div>



        </div>        
      </div>
    </>
  );
};

export default NavBar;
