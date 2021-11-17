import React, { useState, useEffect } from 'react';

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
          <div className="items-center h-26 w-30 md:h-48 md:w-52 flex   cursor-pointer mr-4">
            <div
              onClick={() => {
                window.sessionStorage.setItem('Track_Array', JSON.stringify(''));
                window.sessionStorage.setItem('Track_Array_Size', 0);
                window.location.href = `/track/${props.username}/${props.index}`;
              }}
            >
              <img
                id="album-artwork"
                src={props.track.trackImage}
                className="px-2 w-full h-full 2 rounded "
                alt=""
              ></img>
            </div>
          </div>

          <div className="flex flex-col justify-center m-0 p-0  w-full  truncate  ">
            {/* content */}
            <div className="flex justify-between w-full ">
              <h4 className="playlist  mt-0  uppercase text-gray-500 tracking-widest text-sm">
                {props.track.genre}
              </h4>
              <p className="font-semibold text-gray-500">
                {/* {Math.floor(todo.duration / 60)}:
                {todo.duration - Math.floor(todo.duration / 60) * 60} */}
              </p>
            </div>

            <p
              id="song-title"
              className=" overflow-ellipsis  w-full max-w-full mt-0 mb-1 md:mb-2 drop-shadow xl:text-3xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
            >
              {props.track.trackName}
            </p>

            <p
              id="song-author"
              className="mt-0  mb-1 md:mb-2   text-gray-600 tracking-widest  text-lg flex font-semibold"
            >
              {props.username}&nbsp;
            </p>

            {/* action buttons */}

            <div className=" flex mt-2   ">
              <div className=" sm:flex ">
                <button
                  onClick={handlePlay}
                  className="  cursor-pointer mr-2 uppercase font-bold  bg-gradient-to-r from-green-400 to-blue-500   text-white block py-2 px-10   hover:scale-95 transform transition-all"
                >
                  {`${play ? 'Pause' : 'Play'}`}
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
