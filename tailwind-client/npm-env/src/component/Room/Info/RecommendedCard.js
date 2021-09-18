import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Dropdown} from 'react-bootstrap';


const RecommendedCard = (props) => {

    const [playing, setPlaying] = useState(false);

    const handleMouseMove = () => {
        setPlaying(true);
    };

    const hanldeMouseLeave = () => {
        setPlaying(false);
    };
    console.log(props.value)
    return (
        <div className="flex w-full">

            <div className="cursor-pointer">
                <ReactPlayer
                    onClick={() => {
                        window.location.href = `/playback/${props.value.username}/0`;
                      }}
                    className="justify-self-center"
                    width="12rem"
                    height="auto"
                    playing={playing}
                    volume={0.5}
                    url={`https://cdn.livepeer.com/hls/${props.value.playbackId}/index.m3u8`}
                    controls={false}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={hanldeMouseLeave}
                    muted={true}
                />
            </div>
            <div className="pl-3 text-sm w-full">
                {/* <p className="text-2xl font-semibold mb-0">{props.value.videos[0].videoName.slice(0, 30) + " ..."}</p> */}
                <span>{props.value.name}</span>
                <i class="ml-1 fas fa-check-circle"></i>
                <p>
                    <span className="text-sm font-semibold mr-2">55K views</span>
                    <span>1 Month Ago</span>
                </p>
            </div>
            <Dropdown>

                <Dropdown.Toggle id="dropdown-button-dark-example1 e-caret-hide" variant="secondary" bsPrefix="p-0 " style={{background:"none", border:0}}>
                    <i class=" fas fa-ellipsis-v text-gray-600 cursor-pointer block ml-auto mt-2 mr-2 text-lg"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Play Next</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Add To Queue</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Other Options</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default RecommendedCard;
