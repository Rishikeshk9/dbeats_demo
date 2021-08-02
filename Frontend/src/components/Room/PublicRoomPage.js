import { useEffect } from "react";
import BodyNavbar from './Navbar/Navbar';
import Sidebar from './Navbar/Sidebar';
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
            <Row className={classes.main_body_sections}>
                    <Col xs={2}>      
                      <Sidebar />
                    </Col>
                    <Col  xs={10}>
                        <BodyNavbar />
                        <Public_Info stream_id={props.match.params.roomID}/>
                    </Col> 
            </Row>
            <Footer />
        </>
    );
}

export default PublicRoomPage;