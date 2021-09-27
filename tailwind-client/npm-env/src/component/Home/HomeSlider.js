import React from 'react';
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { CardHeader,Typography } from '@material-ui/core';

const data = new Array(10).fill({ coverImage: "xxx", video: "xxx" })

function ResponsiveCarousel() {
    const ref = React.useRef(<ResponsiveContainer/>);
    return (
      <div style={{ width: '100%', position: 'relative' }}>
          <ResponsiveContainer
              carouselRef={ref}
              render={(width, carouselRef) => {
                return (
                  <StackedCarousel
                      ref={carouselRef}
                      slideComponent={Slide}
                      slideWidth={750}
                      carouselWidth={width}
                      data={data}
                      maxVisibleSlide={5}
                      disableSwipe
                      customScales={[1, 0.85, 0.7, 0.55]}
                      transitionTime={450}
                  />
                );
              }}
          />
        <Fab
            className='twitch-button left'
            size='small'
            onClick={() => ref.current?.goBack()}
        >
            <ArrowBackIcon style={{ fontSize: 30 }} />
        </Fab>
        <Fab
            className='twitch-button right'
            size='small'
            onClick={() => ref.current?.goNext()}
        >
            <ArrowForwardIcon style={{ fontSize: 30 }} />
        </Fab>
      </div>
    );
}

const Slide = React.memo(function (props: StackedCarouselSlideProps) {
    const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
    const [loadDelay, setLoadDelay] = React.useState(null);
    const [removeDelay, setRemoveDelay] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      if (isCenterSlide) {
        clearTimeout(removeDelay);
        setLoadDelay(setTimeout(() => setLoaded(true), 1000));
      } else {
        clearTimeout(loadDelay);
        if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
      }
    }, [isCenterSlide]);

    React.useEffect(() => () => {
      clearTimeout(removeDelay);
      clearTimeout(loadDelay);
    });

    const { coverImage, video } = data[dataIndex];

    return (
      <div className='twitch-card' draggable={false}>
        <div className={`cover fill ${isCenterSlide && loaded ? 'off' : 'on'}`}>
          <div
            className='card-overlay fill'
            onClick={() => {
              if (!isCenterSlide) swipeTo(slideIndex);
            }}
          />
          <img className='cover-image fill' src={coverImage} />
        </div>
        {loaded && (
          <div className='detail fill'>
            <img className='video' src={video} />
            <div className='discription'>
              <CardHeader
                
                title='Bot Danny'
                subheader='September 14, 2016'
              />
              <Typography variant='body2' color='textSecondary' component='p'>
                ...
              </Typography>
            </div>
          </div>
        )}
      </div>
    );
});

export default ResponsiveCarousel;