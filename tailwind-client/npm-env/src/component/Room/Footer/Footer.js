import React from 'react';
import classes from './Footer.module.css';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip, IconButton } from '@material-ui/core';
import playimg from '../../../assets/images/telegram.png';

import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeMute from '@material-ui/icons/VolumeOff';
import FullScreen from '@material-ui/icons/Fullscreen';

import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const PrettoSlider = withStyles({
  root: {
    height: 8,
    width: '80%',
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Footer = (props) => {
  return (
    <div className="fixed bottom-0 bg-white w-full h-28 mb-0 pb-0 shadow flex flex-rows justify-between align-center z-10">
      <div className="w-full self-center">
        <div className="flex">
          <img src={playimg} className="h-20 w-20 p-3 my-auto" alt="img"></img>
          <div className="my-auto pt-3">
            <a
              href={` /profile/${props.playerUsername}`}
              className="no-underline cursor-pointer text-black hover:no-underline"
            >
              <span className="text-2xl font-semibold">{props.playerName}</span>
            </a>
            <p className="">{props.playerUsername}</p>
          </div>
          <i className="fas fa-info-circle block mt-3 ml-3 text-lg text-dbeats-light"></i>
        </div>
      </div>
      <div className="w-full " align="center">
        <div className="">
          <IconButton onClick={props.onRewind} className={classes.controlIcons} aria-label="rewind">
            <FastRewindIcon
              className={classes.fast_forward}
              style={{ width: '40px', height: '40px' }}
            />
          </IconButton>
          <IconButton
            onClick={props.onPlayPause}
            className={classes.control_icons}
            aria-label="play"
          >
            {props.playing ? (
              <PauseIcon className={classes.pause_icon} style={{ width: '40px', height: '40px' }} />
            ) : (
              <PlayArrowIcon
                className={classes.play_icon}
                style={{ width: '40px', height: '40px' }}
              />
            )}
          </IconButton>
          <IconButton
            onClick={props.onFastForward}
            className={classes.controlIcons}
            aria-label="forward"
          >
            <FastForwardIcon
              fontSize="inherit"
              className={classes.fast_forward}
              style={{ width: '40px', height: '40px' }}
            />
          </IconButton>
        </div>
        <div className="flex self-center">
          <PrettoSlider
            style={{ color: '#00d3ff' }}
            min={0}
            max={100}
            ValueLabelComponent={(tim) => (
              <ValueLabelComponent {...tim} value={props.elapsedTime} />
            )}
            aria-label="custom thumb label"
            value={props.played * 100}
            onChange={props.onSeek}
            onMouseDown={props.onSeekMouseDown}
            onChangeCommitted={props.onSeekMouseUp}
            onDuration={props.onDuration}
          />
          <div className="self-center px-2 pb-1.5" onClick={props.onChangeDispayFormat}>
            <p>
              {props.elapsedTime}/{props.totalDuration}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center h-full">
          <div className="self-center">
            <IconButton
              onClick={props.onMute}
              className={`${classes.bottomIcons} ${classes.volumeButton}`}
              style={{ color: '#00d3ff' }}
            >
              {props.muted ? (
                <VolumeMute fontSize="large" />
              ) : props.volume > 0.5 ? (
                <VolumeUp fontSize="large" />
              ) : (
                <VolumeDown fontSize="large" />
              )}
            </IconButton>

            <Slider
              min={0}
              max={100}
              value={props.muted ? 0 : props.volume * 100}
              onChange={props.onVolumeChange}
              aria-labelledby="input-slider"
              onMouseDown={props.onSeekMouseDown}
              onChangeCommitted={props.onVolumeSeekDown}
              style={{ width: '150px', marginBottom: '-8px', color: '#00d3ff' }}
            />
          </div>
          <div className="self-center">
            <IconButton
              onClick={props.onToggleFullScreen}
              className={classes.bottomIcons}
              style={{ paddingLeft: '15px', color: '#00d3ff' }}
            >
              <FullScreen fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
