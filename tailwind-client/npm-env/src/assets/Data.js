import imgback from './images/whitebackground.jpg';
import twitch from './images/twitch.png';
import youtube from './images/youtube.png';
import youtube_logo from './images/youtube_logo.png';
import twitch_logo from './images/twitch_logo.png';
import facebook from './images/facebook.png';
import twitter from './images/twitter_color.png'

export const Data = [
    {
        imgsrc:imgback,
        title:"Create",
        delay:"100"
    },
    {
        imgsrc:imgback,
        title:"Stream",
        delay:"400"
    },
    {
        imgsrc:imgback,
        title:"Broadcast",
        delay:"700"
    },
]

export const MultiStreamData = [
    {
        title:"Youtube",
        rtmp:"rtmp://a.rtmp.youtube.com/live2/",
        image:youtube,
        logo:youtube_logo

    },
    {
        title:"Twitch",
        rtmp:"rtmp://rtmp.twitch.tv/live/",
        image:twitch,
        logo:twitch_logo      

    },
    {
        title:"Facebook",
        rtmp:"rtmp://live-api-s-facebook.com:443/rtmp/",
        image:facebook,
        logo:facebook      

    },
    {
        title:"Twitter",
        rtmp:"rtmp://or.pscp.tv.80/x/",
        image:twitter,
        logo:twitter      

    }
]


