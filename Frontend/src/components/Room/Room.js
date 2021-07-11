import {useEffect} from "react";
import Navbar from './Navbar/Navbar';
import Info from './Info/Info';
import Footer from './Footer/Footer';
import {useDispatch} from 'react-redux'
import {meetRoomId} from '../../redux/action'

const Home = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID))
    }, [])
    return (
        <>
            <Navbar />
            <Info/>
            <Footer />
        </>
    );
}

export default Home;