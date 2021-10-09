import React from 'react';
import classes from './Footer.module.css';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip, IconButton } from '@material-ui/core';

import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeMute from '@material-ui/icons/VolumeOff';
import FullScreen from '@material-ui/icons/Fullscreen';

import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import logoDark from '../../../assets/images/dark-logo.svg';

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
    <div className="fixed bottom-0 bg-white w-full h-28 mb-0 pb-0  flex flex-col lg:flex-row justify-between lg:-ml-8 align-center z-10 dark:bg-dbeats-dark-primary dark:text-gray-100  bg-opacity-80 dark:bg-opacity-90  dark:backdrop-filter  dark:backdrop-blur-md  backdrop-filter  backdrop-blur-md">
      <div className="w-full self-center hidden lg:block">
        <div className="flex">
          <img src={logoDark} className="lg:h-20 lg:w-20 h-16 w-16 p-3 my-auto" alt="img"></img>
          <div className=" flex lg:block flex-row my-auto lg:pt-3">
            <a
              href={` /profile/${props.playerUsername}`}
              className="no-underline cursor-pointer text-black hover:no-underline"
            >
              <span className="text-2xl font-semibold">{props.playerName}</span>
            </a>
            <p className="hidden lg:block">{props.playerUsername}</p>
          </div>
          <i className="fas fa-info-circle block mt-3 ml-3 text-lg text-dbeats-light"></i>
        </div>
      </div>
      <div className="w-full " align="center">
        <div className="h-10 mt-4">
          <IconButton onClick={props.onRewind} className={classes.controlIcons} aria-label="rewind">
            <FastRewindIcon
              className="text-dbeats-light"
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
            className="mx-auto mt-1 lg:mt-3"
          />
          <div
            className="self-center px-2 pb-1.5 hidden lg:block"
            onClick={props.onChangeDispayFormat}
          >
            <p>
              {props.elapsedTime}/{props.totalDuration}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex lg:justify-center  lg:h-full h-10 -mt-10 lg:mt-0 lg:pb-0 justify-around">
          <div className="  lg:block justify-center lg:self-center hidden">
            <IconButton
              onClick={props.onMute}
              className={`${classes.bottomIcons} ${classes.volumeButton} mt-5`}
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
              className="lg:self-center lg:mt-0 hidden lg:block"
            />
          </div>
          <div className="self-center hidden lg:block">
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
