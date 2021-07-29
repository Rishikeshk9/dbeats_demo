import React from "react";
import classes from "./Footer.module.css";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import VolumeDown from '@material-ui/icons/VolumeDown';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PrettoSlider = withStyles({
    root: {
        color: '#00d3ff',
        height: 8,
    },
    thumb: {
        height: 15,
        width: 15,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -4,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    rail: {
        height: 4,
        borderRadius: 2,
    },
})(Slider);


const Footer = () => {

    return (
        <div className={classes.main_footer}>
            <div className={classes.root}>
                <Grid>
                    <Grid item xs={12}>
                        <AudioPlayer className={classes.player}
                            showSkipControls={true} showJumpControls={false}
                            customAdditionalControls={[]}
                            customVolumeControls={[]}
                            layout="stacked-reverse"
                            autoPlay
                            src="http://example.com/audio.mp3"
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.volume}>
                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer;
