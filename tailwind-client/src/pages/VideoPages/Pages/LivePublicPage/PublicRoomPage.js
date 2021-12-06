import React from 'react';
import PublicInfo from './Public_Info';

const PublicRoomPage = (props) => {
  return (
    <>
      <div id="outer-container" style={{ height: '100%' }}>
        <main id="page-wrap">
          <PublicInfo stream_id={props.match.params.username} />
        </main>
      </div>
    </>
  );
};

export default PublicRoomPage;
