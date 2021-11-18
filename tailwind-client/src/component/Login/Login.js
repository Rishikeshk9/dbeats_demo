import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import useWeb3Modal from '../../hooks/useWeb3Modal';
import { useSelector } from 'react-redux';
import moralisLogo from '../../assets/images/moralis-light.svg';
import Ticket from '../Profile/ProfileSections/Ticket/Ticket';

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
          window.localStorage.setItem('user', JSON.stringify(response.data));
          //window.location.reload();
          window.location.href = '/';
        } else {
          alert('Invalid Login');
        }
      })
      .catch(function (error) {
        console.log(error);
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
            className="w-12 h-12 rounded-full self-center"
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
          className="font-bold flex self-center text-center"
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
            className="w-12 h-12 rounded-full self-center"
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
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
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
        <div className="bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-secondary  dark:to-dbeats-dark-primary pt-18">
          <main className={`    w-max self-center mx-auto mt-24 `}>
            <div
              className={`    bg-white dark:bg-dbeats-dark-alt w-max   mx-auto     self-center py-5`}
            >
              {!login ? (
                <div className="  w-full transition-all">
                  <div className="flex flex-col justify-center   text-lg px-5">
                    <div className="self-center  text-2xl font-bold text-gray-900 dark:text-white">
                      SIGN UP
                    </div>

                    <input
                      className="self-center my-2 rounded w-full mx-5    border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => handleNameChange(e)}
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5    border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleUsernameChange(e)}
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5    border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e)}
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5    border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => handleConfirmPasswordChange(e)}
                    />
                    <div className="self-center my-2 mx-3 px-8  cursor-pointer text-yellow-600 border border-yellow-600 bg-white dark:bg-dbeats-dark-secondary   rounded hover:bg-yellow-600 dark:hover:bg-yellow-600 dark:hover:bg-opacity-5 hover:bg-opacity-5 transform transition-all hover:scale-99">
                      <div className="self-center  ">
                        <WalletButton
                          provider={provider}
                          loadWeb3Modal={loadWeb3Modal}
                          logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="self-center w-full  mx-3   flex my-3 py-2 px-24  text-center text-dbeats-light dark:text-white font-bold bg-dbeats-light bg-opacity-5 hover:text-white hover:bg-dbeats-light border  transition-all border-dbeats-light hover:scale-99 transform rounded relative"
                        onClick={createStream}
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
                  <div className="flex flex-col justify-center   text-lg px-5">
                    <h1 className="self-center  text-2xl font-bold text-gray-900 dark:text-white">
                      SIGN IN
                    </h1>
                    <input
                      className="self-center my-2 rounded w-full mx-5    border-0   dark:bg-dbeats-dark-primary bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleUsernameChange(e)}
                    />
                    <input
                      className="self-center my-2 rounded w-full mx-5   border-0   dark:bg-dbeats-dark-primary  bg-gray-100 text-gray-900 dark:text-white focus:ring-dbeats-light"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e)}
                    />

                    <div className="flex justify-center text-center">
                      <button
                        onClick={handleLogin}
                        className="self-center w-full  mx-3   flex my-3 py-2 px-24  text-center text-dbeats-light dark:text-white font-bold bg-dbeats-light bg-opacity-5 hover:text-white hover:bg-dbeats-light border  transition-all border-dbeats-light hover:scale-99 transform rounded relative"
                      >
                        SIGN IN
                        <div
                          hidden={loader}
                          className="w-6 h-6 absolute right-10 align-center border-t-4 border-b-4 border-white rounded-full animate-spin"
                        ></div>
                      </button>
                    </div>
                    <a className="self-center py-2 text-gray-900 dark:text-white" href="/#">
                      Forgot your password?
                    </a>
                    <hr className="my-3 w-2/3 self-center" />

                    <div className="self-center my-3 mx-5 cursor-pointer text-yellow-600 border border-yellow-600 bg-white dark:bg-dbeats-dark-secondary px-10 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-600 dark:hover:bg-opacity-5 hover:bg-opacity-5 transform transition-all hover:scale-99">
                      <div className="self-center ">
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
            <div className="text-center p-5 text-gray-900 dark:text-white">
              {!login ? (
                <div>
                  <button
                    className="rounded text-dbeats-light dark:text-gray-100 font-semibold"
                    id="signIn"
                    onClick={handleSignUp}
                  >
                    Already have an Account?
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="rounded text-dbeats-light dark:text-gray-100  font-semibold"
                    id="signUp"
                    onClick={handleSignIn}
                  >
                    Create New Account
                  </button>
                </div>
              )}
            </div>
            <div className="self-center text-center mt-5 dark:text-gray-500 font-semibold opacity-50">
              powered by{' '}
              <img
                src={moralisLogo}
                className="h-10 rounded w-max  self-center mx-auto bg-blue-50 dark:bg-white p-2 dark:bg-opacity-75"
              ></img>
            </div>
          </main>
        </div>
      </div>
      <Ticket></Ticket>
    </>
  );
};

export default Login;
