import React from 'react';
import UserInfo from './User_Info';

const UserRoomPage = (props) => {
  return (
    <>
      <div id="outer-container" style={{ height: '100%' }}>
        <main id="page-wrap">
          <UserInfo stream_id={props.match.params.roomID} />
        </main>
      </div>
    </>
  );
};

export default UserRoomPage;
