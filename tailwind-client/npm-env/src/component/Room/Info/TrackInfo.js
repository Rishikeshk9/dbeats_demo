// import React from 'react';
// import { useSelector } from 'react-redux';
// //import VideoPlayer from '../VideoPlayer/VideoPlayer';
// import TrackCard from '../../Profile/TrackCard';

// const TrackInfo = () => {
//   const user = JSON.parse(window.localStorage.getItem('user'));
//   const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
//   const [userData, setUserData] = useState(null);

//   const get_User = async () => {
//     await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${props.stream_id}`).then((value) => {
//       setUserData(value.data);
//     });
//   };
//   return (
//     <div className={`${darkMode && 'dark'}`}>
//       <div className="w-full ">
//         <TrackCard track={user.tracks[0]} username={user.username} />
//       </div>
//     </div>
//   );
// };

// export default TrackInfo;
