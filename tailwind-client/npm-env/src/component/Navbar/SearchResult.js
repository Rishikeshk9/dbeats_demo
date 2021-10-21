import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import logo from '../../assets/images/logo.svg';
import { useSelector } from 'react-redux';
import CarouselCard from '../Profile/CarouselCard';

const SearchResult = () => {
  const darkMode = useSelector((state) => state.toggleDarkMode);
  const data = JSON.parse(window.sessionStorage.getItem('searchResult'));
  console.log(data);
  return (
    <div id="outer-container" className="h-full ">
      <div id="page-wrap" className={`${darkMode && 'dark'}  `}>
        <div className="pb-10 pt-4 bg-gradient-to-b from-blue-50 via-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-primary  dark:to-dbeats-dark-primary mx-auto  self-center  relative w-full h-screen     ">
          {data ? (
            <>
              <div className="w-full pt-16 justify-center text-center mx-auto">
                <p
                  id="song-title"
                  className="mb-3 w-max mx-auto   self-center text-center  drop-shadow text-2xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-white dark:to-gray-800"
                >
                  <span className=" bg-red-900 animate-ping mr-2 rounded-full   inline-block  h-2 w-2 self-center ">
                    &middot;
                  </span>
                  Search Results
                </p>
                {data.usernameData && data.usernameData.length > 0 ? (
                  <>
                    <Splide
                      options={{
                        drag: true,
                        arrows: false,
                        rewind: true,
                        perPage: 6,
                      }}
                      className="w-2/3  mx-auto self-center p-5 m-5 "
                    >
                      {data.usernameData.map((value, i) => {
                        return (
                          <SplideSlide className=" px-5" key={i}>
                            <a href={`/profile/${value.username}`}>
                              <img
                                className="mx-auto   self-center  cursor-pointer"
                                src={logo}
                                alt="Image 1"
                              />
                            </a>
                            <p className="dark:text-white">{value.username}</p>
                          </SplideSlide>
                        );
                      })}
                    </Splide>{' '}
                  </>
                ) : (
                  <div className="w-full text-center">
                    <p className="dark:text-white p-5">No Users Found</p>
                  </div>
                )}
              </div>
              <div>
                {data.videoData && data.videoData.length > 0 ? (
                  <div className="px-20 ml-16 py-10 dark:bg-dbeats-dark-alt">
                    {data.videoData.map((value, i) => {
                      //console.log(playbackUser)
                      return (
                        <div key={i}>
                          <CarouselCard
                            playbackUserData={value.video}
                            index={value.index}
                            username={value.username}
                            type="video"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full text-center">
                    <p className="dark:text-white p-5">No Videos Found</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
