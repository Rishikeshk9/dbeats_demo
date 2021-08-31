import React, {useState} from 'react';
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import person from "../../assests/images/person.jpg";
import classes from "./Home.module.css";

 const CarouselCard = (props) => {

  const [playing, setPlaying] = useState(false);

  let history = useHistory();

  const handleMouseMove = () => {
    setPlaying(true)
  };

  const hanldeMouseLeave = () => {
    setPlaying(false)    
  };

  //console.log(props.playbackUserData)

  return (
<div className="w-full h-auto" >
      <div className={`cursor-pointer`}>
        <ReactPlayer 
          onClick={() => {history.push(`/playback/${props.playbackUserData.username}/0`) } }
          width="100%"
          height="auto"
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
      <div className="col-start-1 row-start-3  px-2 pt-6">
        <p className="flex items-center text-black text-sm font-medium">
          <img src={person} alt="" className="w-10 h-10 rounded-full mr-2 bg-gray-100" />
          <div>
            <span className="text-sm font-semibold">{props.playbackUserData.videos[props.index].videoName.slice(0,30)+"..."}</span>
            <br/>
            <span className="text-xs text-gray-500">{props.playbackUserData.videos[props.index].description.slice(0,30)+"..."}</span>
          </div>
        </p>
        
      </div>
    </div>
  );
}

export default CarouselCard;