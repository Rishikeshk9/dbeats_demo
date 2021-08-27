import { useEffect } from "react";
import NavBar from '../Navbar/Navbar';
import UserInfo from './Info/User_Info';


const UserRoomPage = (props) => {
    
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