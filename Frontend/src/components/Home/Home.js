import React from "react";
import { v1 as uuid } from "uuid";

const Home = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <button onClick={create}>Create Room</button>
    );
}

export default Home;