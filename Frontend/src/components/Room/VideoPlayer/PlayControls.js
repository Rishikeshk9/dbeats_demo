import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

import classes from "./videoPlayer.module.css";

const PlayControls = forwardRef(
  (
    {
      onPlayPause,
      playing,
      played
    },
    ref
  ) => {

    return (
        <div 
          ref={ref} 
          className={classes.playcontrolsWrapper} 
        >

            <Grid  className={classes.playbtn_position}
            container
                >

                <IconButton
                  onClick={onPlayPause}
                  style={{color:"white"}}
                >
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>                
            </Grid>
      </div>
    );
  }
);

PlayControls.propTypes = {
  onPlayPause: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
};
export default PlayControls;
