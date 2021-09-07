import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import person from "../../assests/images/person.png";
import classes from "./Home.module.css";

const PlayBackCard = (props) => {
  const [playing, setPlaying] = useState(false);

  let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

  //console.log(props.playbackUserData)

  return (
    <div className="w-100 h-auto mr-2">
      <div className={`cursor-pointer`}>
        <ReactPlayer
          onClick={() => {
            history.push(`/playback/${props.playbackUserData.username}/0`);
          }}
          width="100%"
          height="21.9vh"
          playing={playing}
          muted={false}
          volume={0.5}
          url={props.playbackUserData.videos[props.index].link}
          controls={false}
          className={classes.cards_videos}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      <div className="col-start-1 row-start-3 pb-2 pt-2">
        <p className="flex   text-black text-sm font-medium">
          <img
            src={person}
            alt=""
            className="w-10 h-10 rounded-full mr-2 bg-gray-100"
          />
          <div>
            <span className="text-sm font-semibold">
              {props.playbackUserData.videos[props.index].videoName.slice(
                0,
                60
              ) + "..."}
            </span>
            <br />
            <span className="text-xs text-gray-500">
              {props.playbackUserData.videos[props.index].description.slice(
                0,
                60
              ) + "..."}
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlayBackCard;
