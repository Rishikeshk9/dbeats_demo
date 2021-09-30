import React from 'react';
import PlayBackInfo from './Info/Playback_Info';

const PlayBackRoomPage = (props) => {
  return (
    <>
      <div id="outer-container" style={{ height: '100%' }}>
        <main id="page-wrap">
          <PlayBackInfo
            stream_id={props.match.params.username}
            video_id={props.match.params.video_id}
          />
        </main>
      </div>
    </>
  );
};

export default PlayBackRoomPage;
