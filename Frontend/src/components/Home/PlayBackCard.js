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
        <a href={`/#/playback/${props.playbackUserData.username}/0`}><ReactPlayer
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
        </a>
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
                45
              ) + "..."}
            </span>
            <br />
            <span className="text-s text-gray-500">
              {props.playbackUserData.name}
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default PlayBackCard;
