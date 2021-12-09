import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import useWeb3Modal from '../../hooks/useWeb3Modal';
import { useSelector } from 'react-redux';
import moralisLogo from '../../assets/images/moralis-light.svg';
//import Ticket from '../Profile/ProfileSections/Ticket/Ticket';
import Cookies from 'js-cookie';

const Moralis = require('moralis');

const Login = () => {
  // Web3
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const bcrypt = require('bcryptjs');

  Moralis.initialize('RrKpMiHThO0v1tXiKcxJuBacU35i7UidwNwQq0as');

  Moralis.serverURL = 'https://58zywcsvxppw.usemoralis.com:2053/server';

  // Form varibles
  const [form_name, setName] = useState('');
  const [form_username, setUsername] = useState('');
  const [form_password, setPassword] = useState('');
  const [form_confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(true);
  const [loader, setLoader] = useState(true);

  //checks
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [confirmPasswordCheck, setconfirmPasswordCheck] = useState(false);

  const handleLogin = () => {
    setLoader(false);
    const userData = {
      username: form_username,
      password: form_password,
    };

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
      data: userData,
    })
      .then((response) => {
        if (response.data) {
          //console.log(response.data);
          Cookies.set('jwtToken', response.data.jwtToken, { expires: 7 });
          window.localStorage.setItem('user', JSON.stringify(response.data.username));
          //window.location.reload();
          window.location.href = '/';
        } else {
          setInvalidPassword(true);
        }
      })
      .catch(function (error) {
        setInvalidUsername(true);
      });
    setLoader(true);
  };

  // Create a Stream Profile
  const createStream = async () => {
    setLoader(false);
    let streamData = {
      name: `${form_name}`,
      profiles: [
        {
          name: '720p',
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: '480p',
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: '360p',
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    };

    const stream = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/create_stream`,
      data: streamData,
    });

    let walletId = '';
    if (provider) {
      walletId = provider.provider.selectedAddress;
    }

    let password = await bcrypt.hash(form_password, 10);
    let confirmPass = await bcrypt.hash(form_confirmPassword, 10);

    const userData = {
      name: form_name,
      username: form_username,
      password: password,
      confirm_password: confirmPass,
      wallet_id: walletId,
      livepeer_data: stream.data,
    };

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/user/add`,
      data: userData,
    })
      .then(function (response) {
        window.localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });

    setLoader(true);
  };

  // Metamask Auth
  function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
    return (
      <div>
        <Button
          type="button"
          className="font-bold flex self-center text-center"
          onClick={async () => {
            if (!provider) {
              loadWeb3Modal();
            } else {
              logoutOfWeb3Modal();
            }
          }}
        >
          <p className="mt-2">
            {' '}
            {!provider
              ? 'Connect MetaMask '
              : `Connected (${
                  provider.provider.selectedAddress.slice(0, 4) +
                  '...' +
                  provider.provider.selectedAddress.slice(-4)
                })`}
          </p>
          <img
            className="2xl:w-12 2xl:h-12 lg:w-9 lg:h-9 h-9 w-9 rounded-full self-center"
            alt="metamask button"
            src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
          ></img>
        </Button>
      </div>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function LoginWalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
    return (
      <div>
        <Button
          className="font-bold flex lg:text-sm 2xl:text-lg self-center text-center"
          type="button"
          onClick={async () => {
            let variable = await loadWeb3Modal();
            if (provider && variable) {
              await axios
                .get(
                  `${process.env.REACT_APP_SERVER_URL}/user/getuser_by_wallet/${provider.provider.selectedAddress}`,
                )
                .then((value) => {
                  window.localStorage.setItem('user', JSON.stringify(value.data));
                  window.location.href = '/';
                });
            }
          }}
        >
          <p className="mt-2">{!provider ? 'Login using ' : `MetaMask Connected (Click Again)`}</p>
          <img
            className="2xl:w-12 2xl:h-12 lg:w-9 lg:h-9 h-9 w-9 rounded-full self-center"
            alt="metamask login"
            src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
          ></img>
        </Button>
      </div>
    );
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setInvalidUsername(false);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInvalidPassword(false);
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    if (form_password !== e.target.value) {
      setconfirmPasswordCheck(true);
    } else {
      setconfirmPasswordCheck(false);
    }
    setConfirmPassword(e.target.value);
  };

  const handleSignIn = () => {
    setLogin(false);
  };

  const handleSignUp = () => {
    setLogin(true);
  };
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  return (
    <>
      <div className={`${darkMode && 'dark'} `}>
        <div className="bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary 2xl:pt-18 lg:pt-5 pt-5">
          <main className={` lg:w-1/2 w-11/12 self-center mx-auto mt-24 `}>
            <div
              className={`2xl:py-10 2xl:px-8 lg:px-3 lg:py-3 bg-white dark:bg-dbeats-dark-alt lg:w-1/2  w-11/12 mx-auto     self-center 2xl:py-5 lg:py-3`}
            >
              {login ? (
                <div className="  w-full transition-all">
                  <div className="flex flex-col justify-center   text-lg px-5 pt-2 lg:pt-0">
                    <div className="self-center  2xl:text-2xl lg:text-lg text-xl font-bold text-gray-900 dark:text-white">
                      SIGN UP
                    </div>

                    <input
                      className="self-center my-2 rounded w-full mx-5  lg:h-8 2xl:h-10   border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 lg:text-xs 2xl:text-lg  dark:text-white focus:ring-dbeats-light"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => handleNameChange(e)}
                      required
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5  lg:h-8 2xl:h-10   border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 lg:text-xs 2xl:text-lg dark:text-white focus:ring-dbeats-light"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleUsernameChange(e)}
                      required
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5  lg:h-8 2xl:h-10   border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 lg:text-xs 2xl:text-lg dark:text-white focus:ring-dbeats-light"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e)}
                      required
                    />
                    <>
                      <input
                        className={`self-center mt-2 mb-1 rounded w-full mx-5 lg:h-8 2xl:h-10 lg:text-xs 2xl:text-lg
                        border-0  dark:bg-dbeats-dark-primary focus:outline-none
                        ${confirmPasswordCheck ? 'focus:ring-red-800' : 'focus:ring-dbeats-light'} 
                        bg-gray-100 text-gray-900 
                        dark:text-white 
                        
                        `}
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => handleConfirmPasswordChange(e)}
                        required
                      />
                      <p
                        className={`${
                          confirmPasswordCheck
                            ? '2xl:text-sm lg:text-xs  text-red-500 mb-1'
                            : 'hidden'
                        }`}
                      >
                        Confirm Password doesn't match Password
                      </p>
                    </>
                    <div
                      className="flex justify-center 2xl:mt-6 lg:mt-3 mt-3 mb-2 cursor-pointer text-yellow-600 
                    border border-yellow-600 bg-white dark:bg-dbeats-dark-secondary   
                    rounded hover:bg-yellow-600 dark:hover:bg-yellow-600 
                    dark:hover:bg-opacity-5 hover:bg-opacity-5 transform transition-all 
                    hover:scale-99  mx-3 py-1 2xl:text-lg lg:text-sm"
                    >
                      <div className=" ">
                        <WalletButton
                          provider={provider}
                          loadWeb3Modal={loadWeb3Modal}
                          logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className={`${
                          !(provider && provider.provider.selectedAddress) ||
                          form_name === '' ||
                          form_username === '' ||
                          form_password === '' ||
                          form_confirmPassword === ''
                            ? 'flex justify-center  w-full  mx-3   flex my-3 py-2 2xl:px-24 lg:px-10 2xl:text-lg lg:text-sm  text-center text-dbeats-light dark:text-white font-bold bg-dbeats-light bg-opacity-5 rounded relative cursor-default'
                            : 'flex justify-center  w-full  mx-3   flex my-3 py-2 2xl:px-24 lg:px-10 2xl:text-lg lg:text-sm  text-center text-dbeats-light dark:text-white font-bold bg-dbeats-light bg-opacity-5 hover:text-white hover:bg-dbeats-light border transition-all border-dbeats-light hover:scale-99 transform rounded relative'
                        }`}
                        onClick={createStream}
                        disabled={
                          !(provider && provider.provider.selectedAddress) ||
                          form_name === '' ||
                          form_username === '' ||
                          form_password === '' ||
                          form_confirmPassword === ''
                        }
                      >
                        SIGN UP
                        <div
                          hidden={loader}
                          className="w-6 h-6 ml-3 mt-0.5 align-center border-t-4 border-b-4 border-white rounded-full animate-spin"
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="  w-full  ">
                  <div className="flex flex-col justify-center   2xl:text-lg lg:texr-md px-5 pt-2 lg:pt-0">
                    <h1 className="self-center  2xl:text-2xl lg:text-md text-xl font-bold text-gray-900 dark:text-white">
                      SIGN IN
                    </h1>
                    <>
                      <input
                        className={`self-center mt-2 mb-1 rounded w-full mx-5 lg:h-8 2xl:h-10 lg:text-xs 2xl:text-lg
                        border-0  dark:bg-dbeats-dark-primary
                        ${invalidUsername ? 'border-2 border-red-500 focus:ring-red-800' : ''} 
                        bg-gray-100 text-gray-900 
                        dark:text-white 
                        focus:ring-dbeats-light
                        `}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => handleUsernameChange(e)}
                      />
                      <p
                        className={`${
                          invalidUsername ? '2xl:text-sm lg:text-xs  text-red-500 mb-1' : 'hidden'
                        }`}
                      >
                        Please Enter Valid Username
                      </p>
                    </>
                    <>
                      <input
                        className={`self-center mt-2 mb-1 rounded w-full mx-5 lg:h-8 2xl:h-10 lg:text-xs 2xl:text-lg
                      border-0 dark:bg-dbeats-dark-primary 
                      ${invalidPassword ? 'border-2 border-red-500 focus:ring-red-800' : ''} 
                      bg-gray-100 text-gray-900 
                      dark:text-white 
                      focus:ring-dbeats-light`}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => handlePasswordChange(e)}
                      />
                      <p
                        className={`${
                          invalidPassword ? '2xl:text-sm lg:text-xs text-red-500 mb-1' : 'hidden'
                        }`}
                      >
                        Please Enter Valid Password
                      </p>
                    </>

                    <div className="flex justify-center ">
                      <button
                        onClick={handleLogin}
                        className="flex justify-center w-full  mx-3   flex my-3 py-2 2xl:px-24 lg:px-10 2xl:text-lg lg:text-sm  text-dbeats-light 
                        dark:text-white font-bold bg-dbeats-light bg-opacity-5 
                        hover:text-white hover:bg-dbeats-light border  
                        transition-all border-dbeats-light hover:scale-99 transform rounded relative"
                      >
                        SIGN IN
                        <div
                          hidden={loader}
                          className="w-6 h-6 absolute right-10 align-center border-t-4 border-b-4 border-white rounded-full animate-spin"
                        ></div>
                      </button>
                    </div>
                    <a
                      className="self-center 2xl:py-2 lg:py-0 mb-2 lg:mb-0 2xl:text-lg lg:text-xs text-gray-900 dark:text-white"
                      href="/#"
                    >
                      Forgot your password ?
                    </a>
                    <hr className="2xl:my-3 lg:my-2 w-2/3 self-center mb-4 lg:mb-0" />

                    <div
                      className="flex justify-center 2xl:mt-6 lg:mt-5 py-2 cursor-pointer text-yellow-600 border border-yellow-600 
                    bg-white dark:bg-dbeats-dark-secondary 
                    rounded hover:bg-yellow-600 dark:hover:bg-yellow-600 dark:hover:bg-opacity-5 
                    hover:bg-opacity-5 transform transition-all hover:scale-99 mb-3 lg:mb-0"
                    >
                      <div className="">
                        <LoginWalletButton
                          provider={provider}
                          loadWeb3Modal={loadWeb3Modal}
                          logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center 2xl:p-5 lg:p-2 text-gray-900 dark:text-white">
              {login ? (
                <div>
                  <button
                    className="rounded text-dbeats-light mt-2 lg:mt-0 lg:text-xs 2xl:text-lg dark:text-gray-100 font-semibold"
                    id="signIn"
                    onClick={handleSignIn}
                  >
                    Already have an Account?
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="rounded text-dbeats-light mt-2 lg:mt-0 lg:text-xs 2xl:text-lg dark:text-gray-100  font-semibold"
                    id="signUp"
                    onClick={handleSignUp}
                  >
                    Create New Account
                  </button>
                </div>
              )}
            </div>
            <div className="self-center text-center 2xl:mt-0 lg:mt-0 2xl:text-lg lg:text-sm dark:text-gray-500 font-semibold opacity-50">
              powered by{' '}
              <img
                src={moralisLogo}
                alt="moralisLogo"
                className="2xl:h-10 lg:h-8 h-9 rounded w-max  self-center mx-auto bg-blue-50 dark:bg-white p-2 dark:bg-opacity-75"
              ></img>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
