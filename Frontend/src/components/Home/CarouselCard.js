import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    overflow: 'visible',
    backgroundColor:"#eeeeee"
  },
  media: {
    height: 0,
    cursor: "pointer",
    "&:hover": {
      transform:'scale(1.1)',
      transform: 'translate(5px,5px)',
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

 const CarouselCard = (props) => {
  

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [playing, setPlaying] = useState(false);

  let history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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