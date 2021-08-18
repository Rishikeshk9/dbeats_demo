import { useEffect } from "react";
import NavBar from '../Navbar/Navbar';
import PublicInfo from './Info/Public_Info';
import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'

const PublicRoomPage = (props) => {
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div id="outer-container" style={{ height: '100%' }}>
                <NavBar />
                <main id="page-wrap">
                    <PublicInfo stream_id={props.match.params.roomID}/>
                </main>
            </div>
        </>
    );
}

export default PublicRoomPage;