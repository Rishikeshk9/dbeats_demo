import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import classes from "./Login.module.css";
import axios from "axios";

import useWeb3Modal from "../../hooks/useWeb3Modal";

const Login = (props) => {
  // Web3
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const bcrypt = require("bcryptjs");

  // Form varibles
  const [form_name, setName] = useState("");
  const [form_username, setUsername] = useState("");
  const [form_password, setPassword] = useState("");
  const [form_confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [loader, setLoader] = useState(true);

  const handleLogin = () => {
    const userData = {
      username: form_username,
      password: form_password,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
      data: userData,
    })
      .then(function (response) {
        if (response) {
          console.log(response.data, "resData");
          window.localStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();
          window.location.href = "/";
        } else {
          alert("Invalid Login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Create a Stream Profile
  const createStream = async () => {
    setLoader(false);
    //console.log(form_name," ",form_username," ",form_password)
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
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    };

    const stream = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/create_stream`,
      data: streamData,
    });

    //console.log(stream)

    const userData = {
      name: form_name,
      username: form_username,
      password: await bcrypt.hash(form_password, 10),
      confirm_password: await bcrypt.hash(form_confirmPassword, 10),
      wallet_id: provider.provider.selectedAddress,
      livepeer_data: stream.data,
    };
    console.log(userData);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/user/add`,
      data: userData,
    })
      .then(function (response) {
        //console.log("esponse", response.data);
        window.localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    setLoader(true);
    window.location.href = "/";
  };

  // Metamask Auth
  function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
    return (
      <div>
        <Button
          variant="primary"
          type="button"
          size="lg"
          onClick={async () => {
            if (!provider) {
              loadWeb3Modal();
            } else {
              logoutOfWeb3Modal();
            }
          }}
        >
          {!provider
            ? "Connect Your Wallet "
            : `Wallet Connected (${
                provider.provider.selectedAddress.slice(0, 4) +
                "..." +
                provider.provider.selectedAddress.slice(-4)
              })`}
        </Button>
      </div>
    );
  }

  function LoginWalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
    return (
      <div>
        <Button
          variant="primary"
          type="button"
          size="lg"
          onClick={async () => {
            let variable = await loadWeb3Modal();
            if (provider && variable) {
              await axios
                .get(
                  `${process.env.REACT_APP_SERVER_URL}/user/getuser_by_wallet/${provider.provider.selectedAddress}`
                )
                .then((value) => {
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify(value.data)
                  );
                  window.location.href = "/";
                });
            }
          }}
        >
          {!provider ? "Login Using Wallet " : `Wallet Connected (Click)`}
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
    setLogin(true);
  };

  const handleSignUp = () => {
    setLogin(false);
  };

  return (
    <>
      <div>
        <div id="outer-container" style={{ height: "100vh" }}>
          <main id="page-wrap" className={classes.main_homepage_body}>
            <div className={classes.login_container} id="loginPage_container">
              {login ? (
                <div
                  className={`${classes.form_container} ${classes.sign_up_container}`}
                >
                  <form className={classes.login_form}>
                    <h1>Create Account</h1>
                    <div className={classes.social_container}>
                      <WalletButton
                        provider={provider}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                      />
                    </div>
                    <span className={classes.login_span}>
                      First connect your Wallet
                    </span>

                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => handleNameChange(e)}
                    />
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleUsernameChange(e)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => handleConfirmPasswordChange(e)}
                    />
                    <div className="d-flex">
                      <Button
                        variant="primary"
                        type="button"
                        className={classes.login_button}
                        onClick={createStream}
                      >
                        Sign Up
                      </Button>
                      <div style={{ marginTop: "16px" }}>
                        <Spinner
                          animation="border"
                          variant="info"
                          role="status"
                          hidden={loader}
                          className={classes.login_spinner}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  className={`${classes.form_container} ${classes.sign_in_container}`}
                >
                  <form className={classes.login_form}>
                    <h1>Sign in</h1>
                    <div className={classes.social_container}>
                      <div className={classes.social_container}>
                        <LoginWalletButton
                          provider={provider}
                          loadWeb3Modal={loadWeb3Modal}
                          logoutOfWeb3Modal={logoutOfWeb3Modal}
                        />
                      </div>
                    </div>
                    <span className={classes.login_span}>
                      or use your account
                    </span>
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleUsernameChange(e)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handlePasswordChange(e)}
                    />
                    <a className={classes.social} href="/#">
                      Forgot your password?
                    </a>
                    <button
                      onClick={handleLogin}
                      className={classes.login_button}
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              )}
              <div className={classes.overlay_container}>
                <div className={classes.overlay}>
                  {login ? (
                    <div
                      className={[
                        classes.overlay_panel,
                        classes.overlay_right,
                      ].join(" ")}
                    >
                      <h1>Welcome Back!</h1>
                      <p>
                        To keep connected with us please login with your
                        personal info
                      </p>
                      <button
                        className={classes.login_button}
                        id="signIn"
                        onClick={handleSignUp}
                      >
                        Sign In
                      </button>
                    </div>
                  ) : (
                    <div
                      className={[
                        classes.overlay_panel,
                        classes.overlay_right,
                      ].join(" ")}
                    >
                      <h1>Hello, Friend!</h1>
                      <p>
                        Enter your personal details and start journey with us
                      </p>
                      <button
                        className={classes.login_button}
                        id="signUp"
                        onClick={handleSignIn}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
