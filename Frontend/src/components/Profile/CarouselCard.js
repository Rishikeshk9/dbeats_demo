import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight:400,
    backgroundColor:"#eeeeee",
    borderRadius:'8px'
  },
  media: {
    height: 0,
    cursor: "pointer",
    backgroundColor:"blue",
    marginBottom:"20px",
    "&:hover": {      
      transform: 'translate(0,8px) scale(1.1)',
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
  media_back: {
    backgroundColor:"yellow",
  }
}));

 const CarouselCard = (props) => {
  

  const classes = useStyles();
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
    <Card className={classes.root} >
      <div className={classes.media_back}>
        <ReactPlayer 
          onClick={() => {history.push(`/playback/${props.username}/${props.index}`) } }
          width="100%"
          height="auto"
          playing={playing}
          muted={false} 
          volume={0.5}
          url={props.playbackUserData.link}
          controls={false}
          className={classes.media} 
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      {props.type==="video"
        ? <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title = {props.playbackUserData.videoName}
            subheader = {props.playbackUserData.description}
          />
        : <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title = {props.playbackUserData.videoName}
            subheader = {props.playbackUserData.description}
          />
      }
    </Card>
  );
}

export default CarouselCard;