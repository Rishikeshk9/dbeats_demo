import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import personImg from '../../assets/images/profile.svg';

const PinnedPanel = (props) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);
  ////console.log(props);
  const [pinnedData, setPinnedData] = useState([]);

  const getPinnedData = async (data) => {
    console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${data[i]}`).then((value) => {
        setPinnedData((oldArray) => [...oldArray, value.data]);
      });
    }
  };

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('pinned_user'))) {
      getPinnedData(JSON.parse(window.localStorage.getItem('pinned_user')));
    } else {
      if (props.userdata) {
        if (props.userdata.pinned) {
          window.localStorage.setItem('pinned_user', JSON.stringify(props.userdata.pinned));
          getPinnedData(props.userdata.pinned);
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  console.log(pinnedData);

  ////console.log(pinnedData);
  return (
    <div className={` w-full fixed top-0 ${darkMode && 'dark'} z-2 -ml-1`}>
      <div
        className={`hidden lg:block pt-16 bg-white w-max shadow  z-10 h-full fixed dark:bg-dbeats-dark-primary 2xl:px-3 lg:px-2  dark:text-gray-100  flex flex-col justify-center `}
      >
        {/* Subscribed User Avatar */}
        {pinnedData.map((pinnedUser, i) => {
          return (
            <div key={i} className="flex justify-center content-center w-full cursor-pointer ">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip
                    id="button-tooltip-2"
                    className="bg-blue-50 shadow-md dark:bg-dbeats-dark-primary   z-20 ml-16 -mt-10 mb-1 px-3 py-1 rounded-lg"
                  >
                    <span className="text-md">{pinnedUser.username}</span>
                  </Tooltip>
                }
              >
                <a href={`/profile/${pinnedUser.username}/`} className=" my-2 relative">
                  <img
                    src={pinnedUser.profile_image ? pinnedUser.profile_image : personImg}
                    alt=""
                    className=" 2xl:w-14 2xl:h-14 lg:h-10 lg:w-10 rounded-full hover:shadow hover:scale-95 transform transition-all"
                  />{' '}
                  {/* <div className="bg-red-500 rounded-full shadow  h-6 w-6 text-sm self-center text-center font-semibold  absolute -bottom-2  -right-1 dark:border-dbeats-dark-primary  border-red-300 border-2 text-white  ">
                    2
                  </div> */}
                </a>
              </OverlayTrigger>
            </div>
          );
        })}

        <div className="flex justify-center cursor-pointer  ">
          <a
            className="2xl:w-14 2xl:h-14 lg:h-10 lg:w-10  my-2 rounded-full hover:shadow hover:scale-95 transition-all transform  relative bg-blue-300 dark:bg-dbeats-dark-alt "
            href={
              props.userdata ? `/profile/${props.userdata.username}/subscribed_channels` : `/signup`
            }
          >
            <div className="w-max mx-auto 2xl:mt-3.5 lg:mt-1.5">
              <i className="fas fa-plus 2xl:text-lg lg:text-sm text-center text-white dark:text-blue-200"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PinnedPanel;
