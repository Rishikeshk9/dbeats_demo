import React from 'react';
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { CardHeader, Typography } from '@material-ui/core';
import ReactPlayer from "react-player";

const ResponsiveCarousel = (props) => {
  console.log(props.slides)
  const ref = React.useRef(ResponsiveContainer);
  return (
    <div style={{position: 'relative'}}>
      
      <ResponsiveContainer
        carouselRef={ref}
        className=""
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          else if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              className="bg-gray-500 pb-10"
              style={{height:"50vh"}}
              data={props.slides}
              carouselWidth={parentWidth}
              slideWidth={750}
              slideComponent={Slide}
              maxVisibleSlide={5}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
            />
          )
        }} 
      />
      <div className="absolute flex justify-between w-full -mt-44 z-20">  
        <Fab onClick={() => ref.current.goBack()}>
          <ArrowBackIcon />
        </Fab>
        <Fab onClick={() => ref.current.goNext()}>
          <ArrowForwardIcon />
        </Fab>
      </div>
    </div>
  );
}

const Slide = React.memo(
  function (StackedCarouselSlideProps) {
    const { data, dataIndex } = StackedCarouselSlideProps;
    const value= data[dataIndex];
    return (
      <div className="bg-gray-700 w-full h-max md:h-max flex" 
      onClick={() => {
        window.location.href = `/public/${value.username}/`;
      }}>
        <span className="fixed bg-red-600 text-white px-1 mx-2 my-2 rounded-sm font-semibold z-50">
          {" "}
          Live{" "}
        </span>
        <ReactPlayer
          width="100%"
          height="100%"
          playing={true}
          muted={false}
          volume={0.3}
          style={{objectFit:"cover"}}
          url={`https://cdn.livepeer.com/hls/${value.livepeer_data.playbackId}/index.m3u8`}
        />

        {/* <div className="p-5 self-center">
          <p className="font-bold">{value.name}</p>
        </div> */}
      </div>
    );
  }
);

export default ResponsiveCarousel;