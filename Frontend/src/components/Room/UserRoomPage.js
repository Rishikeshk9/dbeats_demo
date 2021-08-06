import { useEffect } from "react";
import NavBar from '../Navbar/Navbar';
import UserInfo from './Info/User_Info';
import Footer from './Footer/Footer';

import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'

const UserRoomPage = (props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID))
    }, [])
    return (
        <>
            <div id="outer-container" style={{ height: '100%' }}>
                <NavBar />
                <main id="page-wrap">
                    <UserInfo stream_id={props.match.params.roomID}/>
                </main>
            </div>
        </>
    );
}

export default UserRoomPage;