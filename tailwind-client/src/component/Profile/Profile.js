import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChannelSection from './ProfileSections/ChannelSection';
import { useSelector } from 'react-redux';
import { ShareModal } from '../Modals/ShareModal/ShareModal';
// For Routing
import { Route, Switch, useRouteMatch } from 'react-router';
import ChatRoom from './ProfileSections/ChatRoom/ChatRoom';
import NFTStore from './ProfileSections/Store/NFT_Store';
import ProfileDetails from './ProfileSections/ProfileDetails/ProfileDetails';
import Ticket from './ProfileSections/Ticket/Ticket';
import Lottie from 'react-lottie';
import animationData from '../../lotties/error-animation.json';

const Profile = (props) => {
  // For Routing

  let match = useRouteMatch();
  const tabname = props.match.params.tab;
  const urlUsername = props.match.params.username;

  const [user, setUser] = useState(null);
  const [privateUser, setPrivate] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [NFTData, setNFTData] = useState(null);

  const [sharable_data, setSharable_data] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const text = 'Copy To Clipboard';
  const [copybuttonText, setCopyButtonText] = useState(text);

  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  useEffect(() => {
    let value = JSON.parse(window.localStorage.getItem('user'));
    if (value) {
      if (value.username === props.match.params.username) {
        setUser(value);
        setSharable_data(`https://dbeats.live/profile/${value.username}`);
        setPrivate(true);
        get_NFT(value);
      } else {
        get_User();
        setPrivate(false);
      }
    } else {
      get_User();
      setPrivate(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_User = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${props.match.params.username}`)
      .then((value) => {
        if (value.data === '') {
          setNotFound(true);
        } else {
          setUser(value.data);
          setSharable_data(`https://dbeats.live/profile/${value.data.username}`);
          get_NFT(value.data);
        }
      });
  };

  const get_NFT = async (value) => {
    let nftMedata = null;
    //-------------------------------------------------------Fetches all the NFT's of the user on Dbeats-------------------------------------------------------
    //address to use which has already minted the NFTs: 0x5d55407a341d96418ceda98e06c244a502fc9572 or else use ${value.wallet_id}
    await axios({
      method: 'GET',
      // url:
      //   'https://api.nftport.xyz/v0/accounts/' +
      //   value.wallet_id +
      //   '?chain=polygon&include=metadata',
      url: `https://api.covalenthq.com/v1/137/address/0x5d55407a341d96418ceda98e06c244a502fc9572/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b5245f3db18d4a2d999fef65fc0`,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'ad092d8e-feb0-4430-92f7-1fa501b83bec',
      },
    })
      .then((response) => {
        console.log(response);
        let nftData = null;
        //when using covalent api tweak the response to get metadata
        for (let i = 0; i < response.data.data.items.length; i++) {
          const value = response.data.data.items[i];
          console.log(value.contract_address === '0x03160747b94be986261d9340d01128d4d5566383');
          if (value.contract_address === '0x03160747b94be986261d9340d01128d4d5566383') {
            console.log('thisruns');
            console.log(value.nft_data, value.contract_name);
            nftData = value.nft_data;
          }
        }
        console.log(nftData);
        //response.data.nfts for nftport;
        nftMedata = nftData;
      })
      .catch(function (error) {
        console.log(error);
      });
    //-------------------------------------------------------XXXXXXXXXXXXXXXXXENDXXXXXXXXXXXXXXXXXXXX---------------------------------------------------------
    setNFTData(nftMedata);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copybuttonText]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      {user ? (
        <div>
          <div id="outer-container" className="">
            <div id="page-wrap" className={`${darkMode && 'dark'} grid lg:pl-18 grid-cols-6`}>
              <ChannelSection privateUser={privateUser} user={user} />
              <Switch>
                <Route path={`/profile/:username/text`}>
                  <ChatRoom userp={user}></ChatRoom>
                </Route>
                <Route path={`/profile/:username/store`}>
                  <NFTStore NFTData={NFTData} />
                </Route>

                <Route exact path={`/profile/:username/event`}   component={Ticket}></Route>

                <Route path={`${match.path}`}>
                  <ProfileDetails
                    setSharable_data={setSharable_data}
                    tabname={tabname}
                    urlUsername={urlUsername}
                    user={user}
                    setShow={setShow}
                  />
                </Route>
              </Switch>
            </div>

            <ShareModal
              show={show}
              handleClose={handleClose}
              sharable_data={sharable_data}
              copybuttonText={copybuttonText}
              setCopyButtonText={setCopyButtonText}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {notFound ? (
        <div className={`${darkMode && 'dark'}`}>
          <div className="py-32 px-20 dark:text-white flex justify-center dark:bg-dbeats-dark-alt h-screen">
            <div className="flex flex-col items-center">
              <div className="LottieButton opacity-20 absolute">
                <Lottie
                  className="cursor-not-allowed"
                  options={defaultOptions}
                  height={500}
                  width={500}
                />
              </div>
              <div className="text-4xl font-bold mt-6">User Not found</div>
              <div className="text-xl font-bold py-2">Please check username</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Profile;
