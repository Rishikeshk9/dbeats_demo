import { useEffect } from "react";
import Navbar from './Navbar/Navbar';
import User_Info from './Info/User_Info';
import Footer from './Footer/Footer';
import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'

const UserRoomPage = (props) => {
    const dispatch = useDispatch();
    //console.log("hi", props.stream)
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID))
    }, [])
    return (
        <>
            <Navbar />
            <User_Info stream_id={props.match.params.roomID}/>
            <Footer />
        </>
    );
}

export default UserRoomPage;