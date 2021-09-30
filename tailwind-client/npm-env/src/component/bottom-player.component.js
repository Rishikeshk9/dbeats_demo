import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

const BottomBar = ({ songDetails, playing, firstPlayed, setState }) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);

  // eslint-disable-next-line no-unused-vars
  const [audio, setAudio] = useState(new Audio(songDetails.songLink));

  useEffect(() => {
    if (audio.src !== songDetails.songLink) {
      audio.src = songDetails.songLink;
    }

    if (!songDetails.playing) {
      audio.pause();
    } else {
      audio.play();
    }

    console.log('ButtonClicked');
  }, [songDetails, audio]);

  return (
    <>
      <div
        className={`${
          darkMode && 'dark'
        }  font-proxima-reg   bottom-20 fixed  z-100 w-max transition duration-1000 ease-in-out`}
      >
        <Transition
          show={firstPlayed}
          enter="transition ease-in-out duration-1000"
          enterFrom="transform opacity-0  -translate-y-full "
          enterTo="transform bg-opacity-100   translate-y-0 "
          leave="transition ease-in-out duration-500"
          leaveFrom="transform bg-opacity-100   translate-y-0"
          leaveTo="transform   opacity-0 -translate-y-full"
        >
          <div
            className={`${
              firstPlayed ? 'block' : 'hidden'
            }   h-20  bg-white shadow-sm z-100  absolute w-screen dark:bg-dbeats-dark  dark:text-gray-100  bg-opacity-60 dark:bg-opacity-60 backdrop-filter  backdrop-blur-md`}
          >
            <>
              <div className="w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500" />
              <div className="flex justify-between  self-center    md:justify-start md:space-x-10">
                <img
                  id="album-artwork"
                  src={songDetails.artwork}
                  className=" mr-4 sm:mr-0 h-full w-20   "
                  alt=""
                ></img>
                <div className="self-center truncate w-full">
                  <p className="capitalize font-bold whitespace-nowrap truncate">
                    {songDetails.songTitle}
                  </p>
                  <p className="capitalize whitespace-nowrap truncate">{songDetails.author}</p>
                </div>
                {/* <audio key={songLink} autoPlay>
                <source src={songLink} type="audio/mpeg" />
              </audio> */}

                <div className="flex items-center self-center justify-center w-full  ">
                  <div
                    onClick={setState}
                    className="cursor-pointer dark:hover:bg-dbeats-dark-secondary p-1 rounded"
                  >
                    {playing ? (
                      <i className="fas mx-3  text-xl fa-pause    "></i>
                    ) : (
                      <i className="fas mx-3 cursor-pointer text-xl fa-play   "></i>
                    )}
                  </div>

                  <i className="fas mx-3 fa-step-forward"></i>
                </div>
              </div>
            </>
          </div>
        </Transition>
      </div>
    </>
  );
};
export default BottomBar;
