import React, { Fragment, useEffect, useState } from "react";
import classes from "./Info.module.css";
import axios from "axios";
import { Button, Form, Spinner } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";


import Modal from 'react-awesome-modal';
import { MultiStreamData } from "../../../assets/Data";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const UserInfo = (props) => {
  const [userStreams, setUserStreams] = useState([]);

  const user = JSON.parse(window.localStorage.getItem("user"));

  const [playbackUrl, setPlaybackUrl] = useState("");
  const [StreamKey, setKey] = useState("");
  const [loader, setLoader] = useState(true);
  //const [name, setName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  //const [selected, setSelected] = React.useState(false);

  const [multiStreamValue, setMultiStreamValue] = useState({});

  const [multiStreamConnected, setMultiStreamConnected] = useState([]);
  const [patchStream, setPatchStream] = useState([]);

  useEffect(() => {
    if (user.multistream_platform) {
      //console.log("hello",user.multistream_platform)
      let new_array = [];
      for (let i = 0; i < user.multistream_platform.length; i++) {
        new_array.push(user.multistream_platform[i]);
      }
      setMultiStreamConnected(new_array);
      //setPatchStream(new_array)
    } else {
      setMultiStreamConnected([]);
    }
    setPlaybackUrl(
      `https://cdn.livepeer.com/hls/${user.livepeer_data.playbackId}/index.m3u8`
    );
    //setName(user.livepeer_data.name);
    setUserStreams(user.livepeer_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(multiStreamConnected)

  const handleChange = (e) => {
    e.preventDefault();
    setKey(e.target.value);
  };

  const addStreamingPlatform = async (props) => {
    let postData = {
      username: user.username,
      platform: {
        title: multiStreamValue.title,
        logo: multiStreamValue.logo,
        image: multiStreamValue.image,
        rtmp: props,
      },
    };

    console.log(postData)

    let result = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/user/add_multistream_platform`,
        data: postData
      })
    console.log(result)
   

    setMultiStreamConnected([...multiStreamConnected, postData]);
    setShowStreamModal(false);
  };

  const createMultiStream = async () => {
    //console.log(patchStream);

    setLoader(false);

    let multi_data = {
      patchStreamData: [],
      stream_id: userStreams.id,
    };

    for (let i = 0; i < patchStream.length; i++) {
      let data = {
        profile: "source",
        spec: {
          name: patchStream[i].platform.title,
          url: patchStream[i].platform.rtmp,
        },
      };
      multi_data.patchStreamData.push(data);
    }

    // let patchStreamData = {
    //     name: `${multiStreamValue.title}`,
    //     url: `${props}`,
    //     stream_id: userStreams.id
    // }

    //console.log("patchStream:", multi_data);

    const patchingStream = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/patch_multistream`,
      data: multi_data,
    });

    //console.log(patchingStream);

    setLoader(true);
    alert(" Multistream Connection Successfull !!!");
    setShowStreamModal(false);
  };

  const editPlatform = (value, index) => {
    let stored_data = patchStream;

    if (value.selected === 1) {
      let newData = {
        selected: 0,
        platform: multiStreamConnected[index].platform,
      };

      for (let i = 0; i < stored_data.length; i++) {
        if (stored_data[i].platform.title === value.platform.title) {
          stored_data.splice(i, 1);
          break;
        }
      }

      multiStreamConnected.splice(index, 1);
      setMultiStreamConnected((oldArray) => [...oldArray, newData]);
    } else {
      let newData = {
        selected: 1,
        platform: multiStreamConnected[index].platform,
      };

      multiStreamConnected.splice(index, 1);
      setPatchStream((oldArray) => [...oldArray, newData]);
      setMultiStreamConnected((oldArray) => [...oldArray, newData]);
    }
  };

  return (
    <Fragment>
      <div className={classes.info_main_body}>
        <div>
          <VideoPlayer playbackUrl={playbackUrl} className="rounded" />
        </div>
        <div>
          <div className="bg-white py-3 pl-4 mr-3 rounded text-xl shadow">
            <div className="pb-2">
              <span className="text-2xl font-semibold">Streamer Name : </span>
              <p>{user.name}</p>
            </div>
            <div className="pb-2">
              <span className="text-2xl font-semibold">
                Streamer Username :{" "}
              </span>
              <p>{user.username}</p>
            </div>
            <div className="pb-2">
              <span className="text-2xl font-semibold">Streamer Id : </span>
              <p>{userStreams.id}</p>
            </div>
            <div className="pb-2">
              <span className="text-2xl font-semibold">Streamer Key : </span>
              <p>{userStreams.streamKey}</p>
            </div>
            <div className="pb-2  break-words">
              <span className="text-2xl font-semibold">Playback URL : </span>
              <p>{playbackUrl}</p>
            </div>
            <hr width="95%" className="mt-2 mb-4" />
            <div>
              <div className="flex">
                <button
                  variant="primary"
                  className="bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light text-white rounded font-bold px-4 py-2"
                  type="button"
                  onClick={() => setShowDestinationModal(true)}
                >
                  Add MultiStreaming
                </button>
                <div className={classes.multistream_form_spinner}>
                  <Spinner
                    animation="border"
                    variant="info"
                    role="status"
                    hidden={loader}
                  ></Spinner>
                </div>
                <div className="flex">
                  {multiStreamConnected.map((value, index) => {
                    //console.log(value);
                    return (
                      <div className="mx-1">
                        <img
                          src={value.platform.logo}
                          alt="logo"
                          className="h-10 w-auto"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      <Modal
        visible={showDestinationModal}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="py-5 px-10 flex">
          <p className="w-full">
            <div className="font-semibold text-3xl text-center">
              Add Multistream Platforms
            </div>
          </p>
          <div className="ml-5 self-center" onClick={() => setShowDestinationModal(false)}>
            <i class="fas fa-times"></i>
          </div>
        </div>
        <hr />
        <main>
          <div className="grid grid-cols-3 grid-flow-col">
            {multiStreamConnected.map((value, index) => {
              return (
                <div className="bg-white-200 mx-1 border-1 border-gray-300 rounded my-2 flex justify-around">
                  <img
                    src={value.platform.image}
                    alt="logo"
                    className="h-32 w-auto"
                  />
                  <input
                    type="checkbox"
                    className="h-7 w-7 dark:text-dbeats-dark-secondary text-dbeats-light focus:ring-dbeats-light border-gray-300 rounded self-center"
                    value="check"
                    selected={value.selected}
                    onChange={() => {
                      editPlatform(value, index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </main>
        <hr />
        <div className="flex w-full my-5 justify-center align-center px-5">
          <button
            className="w-2/3 mx-2 rounded-md bg-dbeats-light text-white p-2 text-xl font-semibold"
            onClick={() => {
              setModalShow(true);
              setShowDestinationModal(false);
            }}
          >
            Add Destination
          </button>
          <button
            className="w-1/3 mx-2 rounded-md bg-green-500 text-white p-2 text-xl font-semibold"
            onClick={createMultiStream}
          >
            Apply
          </button>
        </div>
      </Modal>


      <Modal
        visible={modalShow}
        onHide={() => setModalShow(false)}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="py-5 px-16 flex">
          <p id="contained-modal-title-vcenter" className="w-full">
            <div className="font-semibold text-2xl text-center">
              Select the MultiStream Platform
            </div>
          </p>
          <div className="ml-5 self-center" onClick={() => setModalShow(false)}>
            <i class="fas fa-times"></i>
          </div>
        </div>
        <hr />
        <main className="py-5 px-6">
          <div className="flex">
            {MultiStreamData.map((value, index) => {
              return (
                <div className="bg-white-200 mx-1 border-1 border-gray-300 rounded">
                  <img
                    src={value.image}
                    alt="logo"
                    className="h-32 w-auto"
                    onClick={() => {
                      setMultiStreamValue(value);
                      setShowStreamModal(true);
                      setModalShow(false);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </Modal>

      <Modal
        visible={showStreamModal}
        className="h-max w-max"
        effect="fadeInUp"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="py-5 px-6 flex">
          <p id="contained-modal-title-vcenter" className="w-full">
            <div className="font-semibold text-3xl text-center">
              {multiStreamValue.title}
            </div>
          </p>
          <div className="ml-5 self-center" onClick={() => setShowStreamModal(false)}>
            <i class="fas fa-times"></i>
          </div>
        </div>
        <hr />
        <main className="px-6 py-6">
          <Form>
            <Form.Group className="mb-3 text-xl">
              <Form.Label>
                <b>Enter Stream-Key </b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SECRET Key"
                onChange={(e) => handleChange(e)}
                style={{ width: "80%" }}
              />
              <div className="py-2 pt-3 pl-1">
                RTMP : {multiStreamValue.rtmp + StreamKey}
              </div>

              <div style={{ display: "flex" }}>
                <Button
                  variant="primary"
                  className=" border-0 bg-gradient-to-r from-dbeats-secondary-light to-dbeats-light rounded px-4 py-2"
                  type="button"
                  onClick={() => {
                    let rtmp = multiStreamValue.rtmp + StreamKey;
                    addStreamingPlatform(rtmp);
                  }}
                >
                  <div className="text-white text-lg font-semibold">
                    Add {multiStreamValue.title}
                  </div>
                </Button>

                <div className={classes.multistream_form_spinner}>
                  <Spinner
                    animation="border"
                    variant="info"
                    role="status"
                    hidden={loader}
                  ></Spinner>
                </div>
              </div>
            </Form.Group>
          </Form>
        </main>
      </Modal>
    </Fragment>
  );
};

export default UserInfo;
