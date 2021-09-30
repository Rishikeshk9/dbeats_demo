import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { scaleRotate as Menu } from 'react-burger-menu';
import logo from '../../assets/images/logo2.png';
import useWeb3Modal from '../../hooks/useWeb3Modal';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../actions/index';
import Toggle from '../toggle.component';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const user = JSON.parse(window.localStorage.getItem('user'));

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.toggleDarkMode);

  //  Modal
  const [showOpen, setOnOpen] = useState(false);

  // Sidebar functions
  const handleOnOpen = () => setOnOpen(true);
  const isMenuOpen = (state) => setOnOpen(state.isOpen);

  // Auth functions

  const handleLogout = () => {
    window.location.href = '/';
    window.localStorage.clear();
    const timer = setTimeout(() => {
      logoutOfWeb3Modal();
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleStreamOnClick = () => {
    window.location.href = `/streamer/${user.username}`;
  };

  const handleProfileOnClick = () => {
    window.location.href = `/profile/${user.username}`;
  };

  // console.log(user, "from navbar")

  const [toggled, setToggled] = useState(true);
  const handleClick = () => {
    setToggled((s) => !s);
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <div className={`${darkMode && 'dark'} `}>
        <Menu
          customBurgerIcon={false}
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          isOpen={showOpen}
          onStateChange={isMenuOpen}
          className={`w-250 bg-white dark:bg-dbeats-dark text-lg text-bold`}
        >
          <div className="pt-5 bg-transparent hidden w-0"></div>
          <div className={classes.menu_items}>
            <a className="text-black text-xl text-bold dark:text-white" id="home" href="/">
              <i id={classes.menu_item} className="fa fa-fw fa-home" style={{ fontSize: '1em' }} />
              <span className={classes.menu_item_name}> Home </span>
            </a>
          </div>
          <div className={classes.menu_items}>
            <a className="text-black text-xl text-bold dark:text-white" id="about" href="#/about">
              <i id={classes.menu_item} className="fas fa-compass" style={{ fontSize: '1em' }} />
              <span className={classes.menu_item_name}> Explorer </span>
            </a>
          </div>
          <div className={classes.menu_items}>
            <a className="text-black text-xl text-bold dark:text-white" id="contact" href="/music">
              <i id={classes.menu_item} className="fas fa-cogs" style={{ fontSize: '1em' }} />
              <span className={classes.menu_item_name}>Music </span>
            </a>
          </div>
          {user ? (
            <div
              className={`${classes.menu_item_logout} text-black text-xl text-bold dark:text-white`}
            >
              <i id={classes.menu_item} style={{ fontSize: '1em' }} className="fas fa-upload"></i>

              <a href="/upload" className={classes.menu_item_name}>
                Upload
              </a>
            </div>
          ) : (
            <> </>
          )}
          {user ? (
            <div
              className={`${classes.menu_item_logout} text-black text-xl text-bold dark:text-white`}
              onClick={handleLogout}
            >
              <i id={classes.menu_item} className="fas fa-door-open" style={{ fontSize: '1em' }} />
              <span className={classes.menu_item_name}> Logout </span>
            </div>
          ) : (
            <> </>
          )}
          <div className="h-max w-max flex items-center justify-center  fixed bottom-28 ">
            <div className="relative flex ml-2 ">
              <Toggle toggled={toggled} onClick={handleClick} />
            </div>
          </div>
        </Menu>
      </div>
      <div
        expand="lg"
        id="navbarScroll"
        className={` w-full fixed top-0 ${darkMode && 'dark'} z-100`}
      >
        <div
          className={`p-3 bg-white shadow-sm z-50  absolute w-screen dark:bg-dbeats-dark dark:text-gray-100  bg-opacity-60    backdrop-filter  backdrop-blur-md`}
        >
          <div className="flex w-full self-center">
            <div
              id="side-bar"
              className="mr-5 cursor-pointer  rounded  self-center"
              onClick={handleOnOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 self-center"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <div
              id="logo"
              className="flex self-center cursor-pointer"
              onClick={() => (window.location.href = '/')}
            >
              <img src={logo} alt="dbeats_logo" className="h-8 w-max"></img>
              <span className="mr-5 text-lg font-bold ml-2">DBeats</span>
            </div>
            <div className="w-1/3 mx-auto  self-center  ">
              <div className="  self-center rounded  flex bg-gray-200 dark:bg-dbeats-dark-secondary">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded border-0 self-center   dark:bg-dbeats-dark-secondary"
                ></input>
                <a href="/" className="self-center text-gray-900">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 self-center mx-3 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            {user ? (
              <div id="login-btn" className="flex">
                <button
                  className="px-3 py-1 border-dbeats-light border-1  text-dbeats-light hover:bg-dbeats-light hover:text-white rounded font-bold mx-2 flex"
                  onClick={handleStreamOnClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 self-center md:mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  <span className="self-center md:flex hidden">Go Live</span>
                </button>
                <button
                  className="shadow-sm h-10 self-center w-10 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded-full font-bold mx-2 flex"
                  onClick={handleProfileOnClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7  mx-auto self-center"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <button
                  className="shadow-sm px-3 py-1 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold mx-2 flex"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  <i className="fas fa-sign-in-alt self-center mr-2"></i>
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
