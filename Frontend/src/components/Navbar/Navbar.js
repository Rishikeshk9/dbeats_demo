import { useState } from "react";
import classes from "./Navbar.module.css";
import { scaleRotate as Menu } from "react-burger-menu";
import { useHistory } from "react-router-dom";
import logo from "../../assests/images/logo2.png";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/Actions/index'

const NavBar = (props) => {

  const [logoutOfWeb3Modal] = useWeb3Modal();


  let history = useHistory();

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggleDarkMode);


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

  const handleStreamOnClick = () => {
    history.push(`/streamer/${user.username}`)
  }

  const handleProfileOnClick = () => {
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
          className={`bg-white  shadow-sm w-full relative flex  p-3 dark:bg-dbeats-dark dark:text-blue-300`}
        >

          <div className='flex w-full self-center'>
            <div id="side-bar" className="mr-5 cursor-pointer  rounded  self-center" onClick={handleOnOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <div id="logo" className="flex self-center cursor-pointer" onClick={() => history.push("/home")}>
              <img src={logo} alt="dbeats_logo" className="h-8 w-max"></img>
              <span className="mr-5 text-lg font-bold ml-2">Dbeats</span>
            </div>
            <div className="w-1/3 mx-auto">
              <div className="bg-white shadow-sm rounded-full flex">
                <input type="text" placeholder="Search" className="w-full border-0 self-center focus:border-0 focus:ring-0"></input>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-center mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {user
              ? (
                <div id="login-btn" className="flex">
                  <button className="shadow-sm px-3 py-1 border-dbeats-light border-1  text-dbeats-light hover:bg-dbeats-light hover:text-white rounded font-bold mx-2 flex"
                  onClick={handleStreamOnClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span className="self-center ">Go Live</span>
                  </button>
                  <button className="shadow-sm h-10 self-center w-10 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded-full font-bold mx-2 flex"
                  onClick={handleProfileOnClick}>                  
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7  mx-auto self-center" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <button className="shadow-sm px-3 py-1 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold mx-2 flex" onClick={() => { history.push(`/login`) }}>
                    <i className="fas fa-sign-in-alt self-center mr-2" ></i>
                    <span className="self-center">Login</span>
                  </button>
                </>
              )}
          </div>


        </div>
      </div>
    </>
  );
};

export default NavBar;
