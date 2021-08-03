import { useEffect,useState } from "react";
import NavBar from '../Navbar/Navbar';
import SideBar from '../Navbar/Sidebar';
import Public_Info from './Info/Public_Info';
import Footer from './Footer/Footer';
import { useDispatch } from 'react-redux'
import { meetRoomId } from '../../redux/action'
import {Row, Col} from "react-bootstrap";
import classes from "./Room.module.css";

const PublicRoomPage = (props) => {
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(meetRoomId(props.match.params.roomID));
    }, [])


    return (
        <>
            <div id="outer-container" style={{ height: '100%' }}>
                <SideBar />
                <main id="page-wrap">
                    <NavBar />
                    <Public_Info stream_id={props.match.params.roomID}/>
                    <Footer />
                </main>
            </div>
        </>
    );
}

export default PublicRoomPage;