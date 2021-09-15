import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import person from "../../assests/images/person.png";
import classes from "./Home.module.css";

const LiveCard = (props) => {
  const [playing, setPlaying] = useState(false);

  let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  //console.log(props.liveUserData.username);

  return (
    <div className="w-full h-auto aspect-w-16 aspect-h-9">
      <div className=" cursor-pointer aspect-w-16 aspect-h-9  ">
        <span className="fixed bg-red-600 text-white px-1 aspect-w-16 aspect-h-9  mx-1 my-1 rounded-sm font-semibold">
          {" "}
          Live{" "}
        </span>
        <ReactPlayer
          onClick={() => {
            history.push(`/public/${props.username}/`);
          }}
          width="100%"
          height="auto"
          playing={playing}
          muted={false}
          volume={0.5}
          url={`https://cdn.livepeer.com/hls/${props.liveUserData.livepeer_data.playbackId}/index.m3u8`}
          controls={false}
          className={`${classes.cards_videos} `}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      <div className="col-start-1 row-start-3 pb-2 pt-2 aspect-w-16 aspect-h-9">
        <p className="flex items-center text-black text-sm font-medium aspect-w-16 aspect-h-9">
          <img
            src={person}
            alt=""
            className="w-10 h-10 rounded-full mr-2 bg-gray-100  "
          />
          <div>
            <span className="text-sm font-semibold">
              {props.liveUserData.username}
            </span>
            <br />
            {/* <span className="text-xs text-gray-500">{props.playbackUserData.videos[props.index].description.slice(0,30)+"..."}</span> */}
          </div>
        </p>
      </div>
    </div>
  );
};

export default LiveCard;
