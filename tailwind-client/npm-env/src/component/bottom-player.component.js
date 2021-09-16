/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";

import { Fragment } from "react";
import React, { useEffect, useRef } from "react";

import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Logo from "../assets/graphics/Dbeats-dark.svg";
import Logo_light from "../assets/graphics/Dbeats-light.svg";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { useSelector, useDispatch } from "react-redux";
import { toggleAudius, toggleDarkMode } from "../actions/index";
const { ethers } = require("ethers");
const jdenticon = require("jdenticon");
const fs = require("fs");

const BottomBar = ({ songLink }) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);
  let firstLoad = 0;
  const [isPlaying, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(songLink));
  console.log(songLink);
  useEffect(() => {
    audio.src = songLink;
    audio.autoplay = true;

    if (firstLoad > 0) setPlaying(!isPlaying);
    firstLoad = firstLoad + 1;
  }, [songLink]);

  const togglePlay = () => {
    if (isPlaying) audio.pause();
    else audio.play();
    setPlaying(!isPlaying);
  };
  return (
    <>
      <div
        className={`${
          darkMode && "dark"
        }  font-proxima-reg   bottom-20 fixed  z-100 w-max transition duration-1000 ease-in-out`}
      >
        <div className=" h-20  bg-white shadow-sm z-100  absolute w-screen dark:bg-dbeats-dark  dark:text-gray-100  bg-opacity-60  backdrop-filter  backdrop-blur-md">
          <>
            <div className="flex justify-between  self-center    md:justify-start md:space-x-10">
              <img
                id="album-artwork"
                src="https://via.placeholder.com/150"
                className=" mr-4 sm:mr-0 h-full w-20   "
                alt=""
              ></img>
              <div className="self-center">
                <p className="capitalize font-bold whitespace-nowrap">
                  SONG TITLE
                </p>
                <p className="capitalize whitespace-nowrap truncate">
                  Song Description
                </p>
              </div>
              {/* <audio key={songLink} autoPlay>
                <source src={songLink} type="audio/mpeg" />
              </audio> */}

              <div className="flex items-center self-center justify-center w-full ">
                {!isPlaying ? (
                  <i
                    className="fas mx-3  text-xl fa-play    "
                    onClick={() => togglePlay()}
                  ></i>
                ) : (
                  <i
                    className="fas mx-3  text-xl fa-pause   "
                    onClick={() => togglePlay()}
                  ></i>
                )}

                <i className="fas mx-3 fa-step-forward"></i>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default BottomBar;
