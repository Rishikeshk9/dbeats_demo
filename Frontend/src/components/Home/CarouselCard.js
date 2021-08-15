import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

  console.log(props);
  return (
    <Card className={classes.root} >
      <div className={classes.media_back}>
        <ReactPlayer 
          onClick={() => {history.push(`/public/${props.streamdata.id}`) } }
          width="100%"
          height="auto"
          playing={playing}
          muted={false} 
          volume={0.5}
          url="https://ipfs.io/ipfs/QmNQrX7k9cRSbfzGdhGjMRt8HUp33aAG4UjVCUNjhniVtF" 
          controls={false}
          className={classes.media} 
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        />
      </div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={props.streamdata.name}
        subheader={props.streamdata.streamKey}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CarouselCard;