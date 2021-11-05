import React, { useState } from 'react';
import ReactPlayer from 'react-player';
//import { useHistory } from "react-router-dom";
import person from '../../../assets/images/profile.svg';

const PlaylistCard = (props) => {
  const [playing, setPlaying] = useState(false);

  //let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  return (
    <div className="w-full h-auto  ">
      <div className={`cursor-pointer`}>
        {/* <a href={`/playback/${props.videoData.username}/0`}> */}
        <ReactPlayer
          width="100%"
          height="auto"
          playing={playing}
          muted={false}
          volume={0.5}
          url={props.videoData.link}
          controls={false}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
        {/* </a> */}
      </div>
      <div className="col-start-1 row-start-3 pb-2 pt-2">
        <p className="flex   text-black text-sm font-medium">
          <img src={person} alt="" className="w-10 h-10 rounded-full mr-2 bg-gray-100" />
          <div>
            <span className="text-sm font-semibold dark:text-gray-200">
              {props.videoData.videoName.slice(0, 45) + '...'}
            </span>
            <br />
            {/* <span className="text-s text-gray-500  ">{props.playbackUserData.name}</span> */}
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
