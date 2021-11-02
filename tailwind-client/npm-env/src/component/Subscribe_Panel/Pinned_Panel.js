import React from 'react';
import { useState, useEffect } from 'react';
import personImg from '../../assets/images/profile.svg';
import { useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Pinned_Panel = (props) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);
  //console.log(props);
  const [pinnedData, setPinnedData] = useState([]);

  useEffect(() => {
    if (props.userdata)
      if (props.userdata.pinned) {
        setPinnedData(props.userdata.pinned);
      }
  }, []);

  //console.log(pinnedData);
  return (
    <div expand="lg" className={` w-max fixed top-0 ${darkMode && 'dark'} z-10`}>
      <div
        className={`hidden lg:block pr-3 pt-20 bg-white w-22 shadow-sm z-10 h-full fixed left-0 dark:bg-dbeats-dark-primary  dark:text-gray-100   `}
      >
        {/* Subscribed User Avatar */}
        {pinnedData.map((pinnedUser, i) => {
          return (
            <div key={i} className="grid grid-flow-row grid-cols-12 cursor-pointer  ">
              <div className="dark:bg-white bg-blue-100 text-white   h-4 text-4xl rounded-tr-full rounded-br-full my-2 col-span-1 self-center">
                {' '}
              </div>
              <div className="  text-white   h-4 text-4xl rounded-tr-full rounded-br-full my-2 col-span-1 self-center">
                {' '}
              </div>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip
                    id="button-tooltip-2"
                    className="bg-blue-50 shadow-md dark:bg-dbeats-dark-primary z-20 ml-16 -mt-12 px-3 py-1 rounded-lg"
                  >
                    <span className="text-md">{pinnedUser}</span>
                  </Tooltip>
                }
              >
                <div className="w-14 self-center h-14    my-2   col-span-10 relative">
                  <img
                    src={personImg}
                    alt=""
                    className="w-14 self-center h-14 rounded-full hover:shadow hover:scale-95 transform transition-all   "
                    onClick={() => {
                      window.location.href = `/profile/${pinnedUser}/`;
                    }}
                  />{' '}
                  <div className="bg-red-500 rounded-full shadow  h-6 w-6 text-sm self-center text-center font-semibold  absolute -bottom-2  -right-1 dark:border-dbeats-dark-primary  border-red-300 border-2 text-white  ">
                    2
                  </div>
                </div>
              </OverlayTrigger>
            </div>
          );
        })}

        <div className="grid grid-flow-row grid-cols-12 cursor-pointer  ">
          <div className="dark:bg-white bg-blue-100 text-white   h-4 text-4xl rounded-tr-full rounded-br-full my-2 col-span-1 self-center">
            {' '}
          </div>
          <div className="  text-white   h-4 text-4xl rounded-tr-full rounded-br-full my-2 col-span-1 self-center">
            {' '}
          </div>
          <div
            className="w-14 self-center h-14    my-2 rounded-full hover:shadow hover:scale-95 transition-all transform col-span-10 relative bg-blue-100 dark:bg-dbeats-dark-alt justify-self-center "
            onClick={() => {
              if (props.userdata) {
                window.location.href = `/profile/${props.userdata.username}/subscribed_channels`;
              } else {
                window.location.href = `/login`;
              }
            }}
          >
            <div className="self-center  w-max mx-auto my-auto mt-3">
              <i className="fas fa-plus text-lg text-center m-auto text-white dark:text=blue-200"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pinned_Panel;
