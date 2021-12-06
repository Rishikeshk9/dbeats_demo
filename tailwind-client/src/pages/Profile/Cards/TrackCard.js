import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrackCard = (props) => {
  //console.log(props);

  const [play, setPlay] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [audio, setAudio] = useState(new Audio(props.track.link));

  useEffect(() => {
    if (!play) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [play, audio]);

  const handlePlay = () => {
    setPlay(!play);
  };

  return (
    <div
      id="tracks-section"
      className={` text-gray-200   mx-auto  py-1 md:py-2 w-full  px-5 my-0 group`}
    >
      {/* header */}
      <div className=" group ">
        <div className="bg-white  group dark:bg-dbeats-dark-primary dark:text-blue-300 shadow-md  flex p-2  mx-auto  rounded-lg  w-full hover:scale-101 transform transition-all">
          <div className="items-center h-26 w-30 2xl:h-180 2xl:w-200 lg:h-90 my-auto lg:w-130 dark:bg-dbeats-dark-alt flex   cursor-pointer mr-4">
            <Link
              to={{
                pathname: `/track/${props.username}/${props.index}`,
              }}
              onClick={() => {
                window.sessionStorage.setItem('Track_Array', JSON.stringify(''));
                window.sessionStorage.setItem('Track_Array_Size', 0);
              }}
            >
              <img
                id="album-artwork"
                src={props.track.trackImage}
                className="w-full h-full 2 rounded "
                alt=""
              ></img>
            </Link>
          </div>

          <div className="flex flex-col justify-center m-0 p-0  w-full  truncate  ">
            {/* content */}
            <div className="flex justify-between w-full ">
              <h4 className="playlist  mt-0 2xl:pb-2.5 lg:pb-0.5 uppercase text-gray-500 tracking-widest 2xl:text-sm lg:text-xs">
                {props.track.genre}
              </h4>
            </div>

            <p
              id="song-title"
              className=" overflow-ellipsis  w-full max-w-full mt-0 2xl:mb-1 lg:mg-0 drop-shadow 2xl:text-3xl lg:text-lg  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            >
              {props.track.trackName}
            </p>

            <div className="flex items-center">
              <p
                id="song-author"
                className="mt-0.5 text-gray-600 tracking-widest  2xl:text-lg lg:text-sm flex font-semibold"
              >
                {props.username}&nbsp;
              </p>
            </div>

            {/* action buttons */}

            <div className=" flex 2xl:mt-4 lg:mt-2 rounded">
              <div className=" sm:flex 2xl:text-lg lg:text-md ">
                <button
                  onClick={handlePlay}
                  className=" cursor-pointer mr-2 uppercase font-bold  bg-gradient-to-r from-green-400 to-blue-500   text-white block 2xl:py-2 2xl:px-10 lg:px-7 lg:py-1   hover:scale-95 transform transition-all"
                >
                  <p className=" 2xl:text-lg lg:text-sm ">{`${play ? 'Pause' : 'Play'}`}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
