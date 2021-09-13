import React,{useState} from 'react';
import ReactPlayer from 'react-player';

const RecommendedCard = (props) => {

    const [playing, setPlaying] = useState(false);

const handleMouseMove = () => {
    setPlaying(true);
  };

  const hanldeMouseLeave = () => {
    setPlaying(false);
  };

    return (
        <div className="flex w-full">

            <div>
                <ReactPlayer
                    className="justify-self-center"
                    width="12rem"
                    height="auto"
                    playing={playing}
                    muted={false}
                    volume={0.5}
                    url={props.value.videos[0].link}
                    controls={false}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={hanldeMouseLeave}
                />
            </div>
            <div className="pl-3 text-sm">
                <p className="text-2xl font-semibold mb-0">{props.value.videos[0].videoName.slice(0,30)+" ..."}</p>
                <span>{props.value.username}</span>
                <i class="ml-1 fas fa-check-circle"></i>
                <p>
                    <span className="text-sm font-semibold mr-2">55K views</span>
                    <span>1 Month Ago</span>
                </p>
            </div>
            <i class="fas fa-ellipsis-v text-gray-300 hover:text-gray-600 cursor-pointer block ml-auto mt-2 mr-2 text-lg"></i>
        </div>
    )
}

export default RecommendedCard;
