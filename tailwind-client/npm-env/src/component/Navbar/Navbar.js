import React, { useState, useEffect, Fragment } from 'react';
import classes from './Navbar.module.css';
import { push as Menu } from 'react-burger-menu';
import logo from '../../assets/images/white-logo.svg';
import logoDark from '../../assets/images/dark-logo.svg';
import { Menu as Dropdown, Transition } from '@headlessui/react';
import axios from 'axios';

import useWeb3Modal from '../../hooks/useWeb3Modal';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../actions/index';
import Toggle from '../toggle.component';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const [notification, setNotification] = useState([]);

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

  const [toggled, setToggled] = useState(JSON.parse(window.localStorage.getItem('darkmode')));
  const handleClick = () => {
    setToggled((s) => !s);
    dispatch(toggleDarkMode(!darkMode));
    if (!darkMode) {
      document.body.style.backgroundColor = '#101010';
    } else {
      document.body.style.backgroundColor = '#fff';
    }
  };

  const handleNotification = () => {
    if (user && user.notification.length > 0) {
      const data = {
        username: user.username,
      };
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/seennotification`,
        data: data,
      })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    window.localStorage.setItem('darkmode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      if (user.notification.length > 0) {
        let data = user.oldnotification;
        for (let i = 0; i < user.notification.length; i++) {
          data.push(user.notification[i]);
        }
        setNotification(user.notification.reverse());
      } else {
        setNotification(user.oldnotification.reverse());
      }
    }
  }, []);

  console.log(notification);

  return (
    <>
      <div className={`${darkMode && 'dark'}`}>
        <Menu
          customBurgerIcon={false}
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          isOpen={showOpen}
          onStateChange={isMenuOpen}
          className={`w-24 lg:w-250 bg-white dark:bg-dbeats-dark-primary text-lg text-bold`}
          width={'16.5rem'}
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
        className={` w-max fixed top-0 ${darkMode && 'dark'} z-50`}
      >
        <div
          className={`p-3 bg-white w-screen shadow-sm z-50  absolute dark:bg-dbeats-dark-primary dark:text-gray-100  bg-opacity-60 dark:bg-opacity-90  dark:backdrop-filter  dark:backdrop-blur-md  backdrop-filter  backdrop-blur-md`}
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
              <img src={logo} alt="dbeats_logo" className="h-10 w-max dark:hidden"></img>
              <img src={logoDark} alt="dbeats_logo" className="h-10 w-max hidden dark:block"></img>
              <span className="mr-5 text-lg font-bold ml-2"> </span>
            </div>
            <div className="w-1/3 mx-auto  self-center  ">
              <div className="  self-center rounded-full  flex bg-gray-100 dark:bg-dbeats-dark-primary">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-full border-0 bg-gray-100 self-center focus:ring-0  px-5 dark:bg-dbeats-dark-secondary"
                ></input>
                <a href="/" className="self-center text-gray-900">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 self-center mx-3 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#aaa"
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
                <Dropdown as="div" className="relative inline-block text-left mr-2 self-center">
                  <div>
                    <Dropdown.Button className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-dbeats-light cursor-pointer z-50"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={handleNotification}
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                      {user && user.notification.length > 0 ? (
                        <div
                          className="bg-red-500 rounded-full shadow  h-6 w-6 text-sm self-center text-center font-semibold  absolute -bottom-1  -right-2 dark:border-dbeats-dark-primary  border-red-300 border-2 text-white  "
                          onClick={handleNotification}
                        >
                          {user.notification.length}
                        </div>
                      ) : (
                        <></>
                      )}
                    </Dropdown.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Dropdown.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {notification.map((value, i) => {
                        return (
                          <div className="px-1 py-1 " key={i}>
                            <Dropdown.Item className="w-full text-gray-700 text-left text-lg pl-2 hover:text-white hover:bg-dbeats-light">
                              <button>{value}</button>
                            </Dropdown.Item>
                          </div>
                        );
                      })}
                    </Dropdown.Items>
                  </Transition>
                </Dropdown>
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
                  className="shadow-sm px-3 py-1 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light dark:bg-gradient-to-r dark:from-dbeats-secondary-light dark:to-dbeats-light text-white rounded font-bold mx-2 flex"
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
