import { useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import User_Info from './Info/User_Info';
import Footer from './Footer/Footer';

import SideBar from '../Navbar/Sidebar';
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
                <SideBar />
                <main id="page-wrap">
                    <Navbar />
                    <User_Info stream_id={props.match.params.roomID}/>
                    <Footer />
                </main>
            </div>
        </>
    );
}

export default UserRoomPage;