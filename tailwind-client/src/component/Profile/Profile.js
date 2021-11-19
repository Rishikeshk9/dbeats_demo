import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChannelSection from './ProfileSections/ChannelSection';
import { useSelector } from 'react-redux';
import { ShareModal } from '../Modals/ShareModal/ShareModal';
// For Routing
import { Route, Switch, useRouteMatch } from 'react-router';
import ChatRoom from './ProfileSections/ChatRoom/ChatRoom';
import NFT_Store from './ProfileSections/Store/NFT_Store';
import ProfileDetails from './ProfileSections/ProfileDetails/ProfileDetails';
import Ticket from './ProfileSections/Ticket/Ticket';

const Profile = (props) => {
  // For Routing  
  
  let match = useRouteMatch();
  const tabname = props.match.params.tab;
  const urlUsername = props.match.params.username;

  const [user, setUser] = useState(null);
  const [privateUser, setPrivate] = useState(true);

  const [NFTData, setNFTData] = useState(null);

  const [sharable_data, setSharable_data] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const text = 'Copy To Clipboard';
  const [copybuttonText, setCopyButtonText] = useState(text);

  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  useEffect(async () => {
    let value = JSON.parse(window.localStorage.getItem('user'));
    if (value) {
      if (value.username === props.match.params.username) {
        setUser(value);
        setSharable_data(`https://dbeats.live/profile/${value.username}`);
        setPrivate(true);
      } else {
        get_User();
        setPrivate(false);
      }
    } else {
      get_User();
      setPrivate(false);
    }

    let nftMedata = null;
    //-------------------------------------------------------Fetches all the NFT's of the user on Dbeats-------------------------------------------------------
    await axios({
      method: 'GET',
      url:
        'https://api.nftport.xyz/v0/accounts/' +
        value.wallet_id +
        '?chain=polygon&include=metadata',
      // url: `https://api.covalenthq.com/v1/137/address/${value.wallet_id}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_b5245f3db18d4a2d999fef65fc0`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'ad092d8e-feb0-4430-92f7-1fa501b83bec',
      },
    })
      .then((response) => {
        console.log(response);
        nftMedata = response.data.nfts;
      })
      .catch(function (error) {
        console.log(error);
      });
    //-------------------------------------------------------XXXXXXXXXXXXXXXXXENDXXXXXXXXXXXXXXXXXXXX---------------------------------------------------------
    setNFTData(nftMedata);
  }, []);

  const get_User = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/user/${props.match.params.username}`)
      .then((value) => {
        setUser(value.data);
        setSharable_data(`https://dbeats.live/profile/${value.data.username}`);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyButtonText(text);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copybuttonText]);

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
                  <NFT_Store NFTData={NFTData}></NFT_Store>
                </Route>

                <Route path={`/profile/:username/event`} component={Ticket} >
                </Route>

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
    </>
  );
};
export default Profile;
