import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waves = ({ src, isPlaying, currentTime, setIsPlaying }) => {
  const waveformRef = useRef();
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (waveformRef.current) {
      setWavesurfer(
        WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#D9DCFF',
          progressColor: '#4353FF',
          cursorColor: '#4353FF',
          barWidth: 3,
          barRadius: 3,
          cursorWidth: 1,
          height: 200,
          barGap: 3,
          interact: false,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.play();
      } else {
        wavesurfer.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.seekTo(currentTime / wavesurfer.getDuration());
    }
  }, [currentTime]);

  useEffect(() => {
    loadAudio();
    if (wavesurfer) {
      wavesurfer.on('finish', function () {
        setIsPlaying(false);
        wavesurfer.stop();
      });
    }
  }, [wavesurfer]);

  const loadAudio = () => {
    if (wavesurfer) {
      wavesurfer.load(src);
      //wavesurfer.zoom(Number(250));
    }
    console.log(wavesurfer);
  };

  return (
    <>
      <div ref={waveformRef}></div>
    </>
  );
};

export default Waves;
