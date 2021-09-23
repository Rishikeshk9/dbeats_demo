import imgback from './images/whitebackground.jpg';
import twitch from './images/MultiStream_Img/twitch.png';
import youtube from './images/MultiStream_Img/youtube.png';
import youtube_logo from './images/MultiStream_Img/youtube_logo.png';
import twitch_logo from './images/MultiStream_Img/twitch_logo.png';
import facebook from './images/MultiStream_Img/facebook2.svg';
import twitter from './images/MultiStream_Img/twitter2.png';
import vk from './images/MultiStream_Img/VK.com-logo.svg.png';
import afreecatv from './images/MultiStream_Img/afreecatv2.png';
import bilibili from './images/MultiStream_Img/bilibili2.png';
import breakerstv from './images/MultiStream_Img/breakerstv.png';
import dailymotion from './images/MultiStream_Img/dailymotion.png';
import dlive from './images/MultiStream_Img/dlive2.png';
import fc2 from './images/MultiStream_Img/fc2.png';
import mixcloud from './images/MultiStream_Img/mixcloud2.png';
import mobcrush from './images/MultiStream_Img/mobcrush2.png';
import nimotv from './images/MultiStream_Img/nimo2.png';
import trovo from './images/MultiStream_Img/trovo2.png';
import vl from './images/MultiStream_Img/vl2.png';
import steam from './images/MultiStream_Img/steam2.svg';
import wowza from './images/MultiStream_Img/wowza2.png';
import akamai from './images/MultiStream_Img/akamai2.png';
import trovo_logo from './images/MultiStream_Img/trovo_logo.png';

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

    },
    {
        title:"Dlive",
        rtmp:"rtmp://stream.dlive.tv/live/",
        image:dlive,
        logo:dlive      

    },
    {
        title:"VK",
        rtmp:"rtmp://ovsu.mycdn.me/input/",
        image:vk,
        logo:vk      

    },
    {
        title:"Dailymotion",
        rtmp:"rtmp://publish.dailymotion.com/publish/",
        image:dailymotion,
        logo:dailymotion      

    },
    {
        title:"Mixcloud",
        rtmp:"rtmp://rtmp.mixcloud.com/broadcast/",
        image:mixcloud,
        logo:mixcloud      

    },
    {
        title:"NimoTv",
        rtmp:"rtmp://txpush.rtmp.nimo.tv/live/",
        image:nimotv,
        logo:nimotv      

    },
    {
        title:"Bilibili",
        rtmp:"rtmp://js.live-send.acg.tv/live-js/",
        image:bilibili,
        logo:bilibili      
    },
    {
        title:"Trovo",
        rtmp:"rtmp://livepush.trovo.live/live/",
        image:trovo,
        logo:trovo_logo      
    },
    {
        title:"AfreecaTv",
        rtmp:"rtmp://rtmp-esu.afreecatv.com/app/",
        image:afreecatv,
        logo:afreecatv      
    },
    {
        title:"Vaughn Live",
        rtmp:"rtmp://live.vaughnlive.tv:443/live/",
        image:vl,
        logo:vl      
    },
    {
        title:"BreakersTv",
        rtmp:"rtmp://live-ord.vaughnsoft.net/live/",
        image:breakerstv,
        logo:breakerstv      
    },
    {
        title:"Mobcrush",
        rtmp:"rtmp://live.mobcrush.net/stream/",
        image:mobcrush,
        logo:mobcrush      
    },
    {
        title:"FC2",
        rtmp:"rtmp://media.live.fc2.com/live/",
        image:fc2,
        logo:fc2      
    },
    {
        title:"Steam",
        rtmp:"rtmp://ingest-01-lhr1.broadcast.steamcontent.com/app/",
        image:steam,
        logo:steam      
    },
    {
        title:"Wowza",
        rtmp:"rtmp://ingest-01-lhr1.broadcast.steamcontent.com/app/",
        image:wowza,
        logo:wowza      
    },
    {
        title:"Akamai",
        rtmp:"rtmp://ingest-01-lhr1.broadcast.steamcontent.com/app/",
        image:akamai,
        logo:akamai      
    },
]


