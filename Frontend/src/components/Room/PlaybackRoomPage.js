import { useEffect } from "react";
import NavBar from '../Navbar/Navbar';
import Playback from './Info/Playback_Info';
import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'

const PlaybackRoomPage = (props) => {
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div id="outer-container" style={{ height: '100%' }}>
                <NavBar />
                <main id="page-wrap">
                    <Playback 
                        stream_id={props.match.params.username} 
                        video_id={props.match.params.video_id}
                    />
                </main>
            </div>
        </>
    );
}

export default PlaybackRoomPage;