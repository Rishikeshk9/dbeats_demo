import React from 'react';
import TrackCard from '../../Cards/TrackCard';
import CarouselCard from '../../Cards/CarouselCard';
import ReactionCard from '../../Cards/ReactionCard';
import Carousel from 'react-grid-carousel';
import PlaylistCard from '../../Cards/PlaylistCard';

export const panelData = [
  <Tab.Panel className="">
    <div className="px-5 pt-10 dark:bg-dbeats-dark-alt"></div>
  </Tab.Panel>,
  <Tab.Panel className="">
    <div className="px-5 2xl:pt-10 lg:pt-5 grid grid-cols-4 grid-flow-row ">
      {user.followee_count ? (
        <div>
          {user.followee_count.map((following, i) => {
            ////console.log(playbackUser)
            return (
              <div
                key={i}
                className="flex 2xl:text-lg lg:text-sm text-md shadow px-10 w-max lg:w-full  my-5 py-2 dark:bg-dbeats-dark-primary dark:text-gray-100"
              >
                {pinnedData.indexOf(following) > -1 ? (
                  <i
                    className="fas fa-thumbtack mx-3 my-auto 2xl:text-xl lg:text-xs cursor-pointer "
                    onClick={() => UnPinningUser(following)}
                  ></i>
                ) : (
                  <i
                    className="fas fa-thumbtack mx-3 my-auto text-xl opacity-20 hover:opacity-100 cursor-pointer -rotate-45 transform"
                    onClick={() => PinningUser(following)}
                  ></i>
                )}
                <h2>{following}</h2>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="">0 Subscribed</p>
      )}
    </div>
  </Tab.Panel>,
  <Tab.Panel className="">
    <div className="px-5 pt-10 dark:bg-dbeats-dark-alt">
      {user.videos ? (
        <div>
          {user.videos.map((playbackUser, i) => {
            ////console.log(playbackUser)
            return (
              <div key={i}>
                <CarouselCard
                  playbackUserData={playbackUser}
                  index={i}
                  username={user.username}
                  type="video"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="2xl:text-lg lg:text-sm">No Videos till now</p>
      )}
    </div>
  </Tab.Panel>,
  <Tab.Panel className="">
    <div className="px-5 pt-10">
      {user.tracks ? (
        <div className="w-full">
          {user.tracks.map((track, i) => {
            ////console.log(playbackUser)
            return (
              <div key={i} className="w-full">
                <TrackCard track={track} index={i} username={user.username} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="2xl:text-lg lg:text-sm">No Tracks till now</p>
      )}
    </div>
  </Tab.Panel>,
  <Tab.Panel className="">
    <div className="px-5 pt-10">
      {user.my_playlists ? (
        <div>
          {user.my_playlists.map((playlist, i) => {
            ////console.log(playbackUser)
            return (
              <>
                <div key={i} className="">
                  <h2 className="dark:text-white 2xl:text-2xl lg:text-lg ml-5 mb-3">
                    {playlist.playlistname}
                  </h2>
                  <div>
                    <Carousel cols={4}>
                      {playlist.playlistdata.map((data, i) => {
                        return (
                          <Carousel.Item key={i}>
                            <PlaylistCard playlistData={data} />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                </div>
                <hr className="my-7" />
              </>
            );
          })}
        </div>
      ) : (
        <p className="2xl:text-lg lg:text-sm">No Existing PlayLists</p>
      )}
    </div>
  </Tab.Panel>,
  <Tab.Panel>
    <div className="2xl:px-5 2xl:pt-5 lg:px-3 lg:pt-2.5">
      {user.your_reactions.length > 0 ? (
        <div>
          {user.your_reactions.map((playbackUser, i) => {
            ////console.log(playbackUser)
            return (
              <div key={i} className="">
                <ReactionCard
                  playbackUserData={playbackUser}
                  index={i}
                  username={user.username}
                  type="video"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="2xl:text-lg lg:text-sm">No Reactions till now</p>
      )}
    </div>
  </Tab.Panel>,
];
