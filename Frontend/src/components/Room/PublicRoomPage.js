import { useEffect } from "react";
import Navbar from './Navbar/Navbar';
import Public_Info from './Info/Public_Info';
import Footer from './Footer/Footer';
import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'

const PublicRoomPage = (props) => {
    const dispatch = useDispatch();
    //console.log("hi", props.stream)
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID))
    }, [])
    return (
        <>
            <Navbar />
            <Public_Info stream_id={props.match.params.roomID}/>
            <Footer />
        </>
    );
}

export default PublicRoomPage;