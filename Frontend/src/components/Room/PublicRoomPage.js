import { useEffect } from "react";
import NavBar from '../Navbar/Navbar';
import PublicInfo from './Info/Public_Info';

const PublicRoomPage = (props) => {

    return (
        <>
            <div id="outer-container" style={{ height: '100%' }}>
                <NavBar />
                <main id="page-wrap">
                    <PublicInfo stream_id={props.match.params.username}/>
                </main>
            </div>
        </>
    );
}

export default PublicRoomPage;