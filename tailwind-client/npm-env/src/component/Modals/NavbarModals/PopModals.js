import React, { useState, useEffect } from 'react';
//import Modal from 'react-awesome-modal';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from '../../dropdown.component';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Noty from 'noty';
import Modal from 'react-modal';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import Chips from 'react-chips';
import { theme, chipTheme } from './Theme';

const user = JSON.parse(window.localStorage.getItem('user'));

function makeStorageClient() {
  return new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBhNzk3MkY3QTRDNUNkZDJlOENBQzE1RDJCZjJBRUFlQTg1QmM3MzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1MTY1MTgyMjUsIm5hbWUiOiJEQmVhdHMifQ.16-okZlX7RmNcszqLq06lvzDkZ-Z8CHnmAIRXjQ2q5Q',
  });
}

export const AnnouncementModal = (props) => {
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
  const [announcementText, setAnnouncementText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [linkText, setLinkText] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setAnnouncementText(e.target.value);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    console.log('Image', e.target.value);
    setPostImage(e.target.value);
  };

  const handleVideoChange = (e) => {
    e.preventDefault();
    console.log('Video', e.target.value);
    setPostVideo(e.target.value);
  };

  const handleLinkChange = (e) => {
    e.preventDefault();
    setLinkText(e.target.value);
  };

  const handleAnnouncement = () => {
    console.log('hello');
    const announcementData = {
      username: user.username,
      announcement: announcementText,
      postImage: postImage,
      postVideo: postVideo,
      link: linkText,
    };
    console.log(announcementData);
    // axios({
    //   method: 'POST',
    //   url: `${process.env.REACT_APP_SERVER_URL}/user/announcement`,
    //   data: announcementData,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    props.setShowAnnouncement(false);
  };

  return (
    <Modal
      isOpen={props.showAnnouncement}
      className={
        darkMode
          ? 'h-max lg:w-1/2 w-5/6 mx-auto lg:mt-40 mt-24 bg-dbeats-dark-primary rounded-xl'
          : 'h-max lg:w-1/2 w-5/6 mx-auto lg:mt-40 mt-24 bg-gray-50 rounded-xl shadow-2xl'
      }
    >
      <div className={`${darkMode && 'dark'} lg:p-5 p-3`}>
        <div className="border border-gray-400 rounded-xl  dark:border-black dark:rounded-none">
          <h2 className="grid grid-cols-5 justify-items-center rounded-t-xl dark:rounded-t-sm lg:text-2xl text-lg py-4 dark:bg-dbeats-dark-alt bg-white dark:text-white">
            <div className="col-span-4 pl-14">Post Details</div>
            <div className="mr-7 flex justify-end w-full" onClick={props.handleCloseAnnouncement}>
              <i className="fas fa-times cursor-pointer"></i>
            </div>
          </h2>
          <hr className="py-4 dark:bg-dbeats-dark-alt" />
          <div className="h-max w-full flex align-center">
            <Container className="lg:px-12 lg:pb-4 px-4 h-full w-full dark:bg-dbeats-dark-alt lg:max-h-full max-h-96  overflow-y-auto lg:overflow-hidden">
              <Row>
                <Col className="align-center">
                  <textarea
                    className="w-full lg:h-48 h-52 border border-gray-300 rounded-md"
                    placeholder=""
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </Col>
              </Row>
              <Row className="flex flex-col lg:w-full w-full justify-center my-2 ">
                <div className="flex lg:flex-row flex-col w-full justify-between">
                  <Col className="mx-2 mb-2">
                    <label className="dark:text-white lg:text-lg text-md ">Add Image</label>
                    <input
                      id="upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      className="my-1  w-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 rounded-sm cursor-pointer"
                    />
                  </Col>
                  <Col className="mx-2 mb-2">
                    <label className="dark:text-white lg:text-lg text-md ">Add Video</label>
                    <input
                      id="upload"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      className="my-1  w-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 rounded-sm cursor-pointer"
                    />
                  </Col>
                </div>

                <Col className="mx-2 mb-2 flex flex-col">
                  <label className="dark:text-white lg:text-lg text-md ">Event Link</label>
                  <input type="text" onChange={handleLinkChange} className=" w-full h-8 my-1 " />
                </Col>
              </Row>
              <Row className="w-full flex justify-center">
                <button
                  type="submit"
                  onClick={handleAnnouncement}
                  className=" lg:my-3  bg-white px-3 lg:py-2 py-1 text-lg lg:text-xl bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 text-white border-0 lg:w-80 w-24 rounded-sm cursor-pointer "
                >
                  Post
                </button>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const UploadVideo = (props) => {
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
  const attribution = [{ name: 'No Attribution' }, { name: 'Allow Attribution' }];

  const commercialUse = [{ name: 'Non Commercial' }, { name: 'Commercial Use' }];

  const derivativeWorks = [
    { name: 'No-Selection' },
    { name: 'No Derivative Works' },
    { name: 'Share-Alike' },
  ];

  const category = [{ name: 'Automobiles' }, { name: 'Astronomy' }, { name: 'Sci-Fi' }];

  const suggestions = ['Games', 'Edu', 'Sci-Fi', 'Counter-Strike'];

  const [selectedAttribution, setSelectedAttribution] = useState(attribution[0].name);
  const [selectedCommercialUse, setSelectedCommercialUse] = useState(commercialUse[0].name);
  const [selectedDerivativeWorks, setSelectedDerivativeWorks] = useState(derivativeWorks[0].name);
  const [selectedCategory, setSelectedCategory] = useState(category[0].name);
  const [tags, setTags] = useState([]);

  const [video, setVideo] = useState({
    videoName: '',
    videoImage: '',
    videoFile: '',
    category: '',
    ratings: '',
    tags: [],
    description: '',
    allowAttribution: '',
    commercialUse: '',
    derivativeWorks: '',
  });

  const handleVideoTags = (e) => {
    setTags(e);
  };

  let name, value;

  const handleVideoInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setVideo({ ...video, [name]: value });
  };

  const fetchSuggestions = (value) => {
    return new Promise((resolve) => {
      if (value.length >= 1) {
        setTimeout(() => {
          let filtered = suggestions.filter(
            (opt) => opt.toLowerCase().indexOf(value.toLowerCase()) !== -1,
          );
          if (filtered.length === 0) {
            if (filtered[0] !== value) {
              let data = [value];
              resolve(data);
            }
          } else {
            resolve(filtered);
          }
        }, 1000);
      } else {
        resolve([]);
      }
    });
  };

  async function storeWithProgress() {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid) => {
      console.log('uploading files with cid:', cid);
      video.cid = cid;
    };
    const blob = new Blob([JSON.stringify(video)], { type: 'application/json' });

    const files = [video.videoFile, video.videoImage, new File([blob], 'meta.json')];
    const totalSize = video.videoFile.size;
    let uploaded = 0;
    const onStoredChunk = (size) => {
      uploaded += size;
      const pct = totalSize / uploaded;
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk });
  }

  const onVideoFileChange = (e) => {
    if (e.target.name === 'videoFile') {
      video.videoFile = e.target.files[0];
      var trckName = e.target.files[0].name.replace(/\.[^/.]+$/, '');
      document.getElementById('videoName').value = trckName;
      video.videoName = trckName;
      document.getElementById('video-label').textContent = trckName;
    } else if (e.target.name === 'videoImage') {
      video.videoImage = e.target.files[0];

      var videoImage = e.target.files[0].name.replace(/\.[^/.]+$/, '');
      document.getElementById('video-thumbnail-label').textContent = videoImage;
    }
  };

  useEffect(() => {
    setVideo({
      ...video,
      category: selectedCategory,
      allowAttribution: selectedAttribution,
      commercialUse: selectedCommercialUse,
      derivativeWorks: selectedDerivativeWorks,
      tags: tags,
    });
  }, [selectedCategory, selectedCommercialUse, selectedDerivativeWorks, selectedAttribution, tags]);

  console.log(video);
  const PostData = async (e) => {
    e.preventDefault();
    if (e.target.value === 'Upload Video') {
      const {
        videoName,
        videoImage,
        videoFile,
        category,
        ratings,
        tags,
        description,
        allowAttribution,
        commercialUse,
        derivativeWorks,
      } = video;
      storeWithProgress(e.target.value).then(() => {
        let formData = new FormData(); // Currently empty
        formData.append('userName', user.username);

        formData.append('videoName', videoName);

        formData.append('tags', tags);
        formData.append('description', description);

        formData.append('category', category);
        formData.append('ratings', ratings);
        formData.append('allowAttribution', allowAttribution);
        formData.append('commercialUse', commercialUse);
        formData.append('derivativeWorks', derivativeWorks);

        formData.append('videoFile', videoFile, videoFile.name);
        formData.append('videoImage', videoImage, videoImage.name);
        formData.append('videoHash', video.cid);

        console.log(formData.values());

        if (
          video.videoFile.length !== 0 &&
          video.videoImage.length !== 0 &&
          video.videoName.length !== 0
        ) {
          axios
            .post(`${process.env.REACT_APP_SERVER_URL}/upload-video`, formData, {
              headers: {
                'content-type': 'multipart/form-data',
              },
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Noty.closeAll();
          new Noty({
            type: 'error',
            text: 'Choose Video File & Fill other Details',
            theme: 'metroui',
            layout: 'bottomRight',
          }).show();
        }
      });
    }
  };

  return (
    <Modal
      isOpen={props.showVideoUpload}
      className={
        darkMode
          ? 'h-max lg:w-max w-5/6 mx-auto lg:mt-32 mt-20 bg-dbeats-dark-primary rounded-xl'
          : 'h-max lg:w-max w-5/6 mx-auto lg:mt-32 mt-20 bg-gray-50 rounded-xl shadow-2xl'
      }
    >
      <div className={`${darkMode && 'dark'} px-5 py-5 h-max`}>
        <h2 className="grid grid-cols-5 justify-items-center lg:text-2xl text-lg py-4 dark:bg-dbeats-dark-alt bg-white dark:text-white">
          <div className="col-span-4 pl-14 ">Upload Video</div>
          <div className="mr-7 flex justify-end w-full" onClick={props.handleCloseVideoUpload}>
            <i className="fas fa-times cursor-pointer"></i>
          </div>
        </h2>
        <hr />
        <form method="POST" encType="multipart/formdata">
          <div className=" bg-white text-gray-500  dark:bg-dbeats-dark-alt dark:text-gray-100   shadow-sm rounded-lg  lg:px-5 lg:py-5 px-2 py-1 mb-5 lg:max-h-full max-h-96  overflow-y-auto lg:overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-6  ">
              <div className="md:col-span-1  ">
                <div className="lg:mt-5 mt-0 md:col-span-2 lg:p-5 p-3 ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 ">
                        <label
                          htmlFor="file-upload3"
                          className="text-center relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span id="video-thumbnail-label" className="text-center">
                            Choose Video Thumbnail
                          </span>
                          <input
                            id="file-upload3"
                            type="file"
                            name="videoImage"
                            accept=".jpg,.png,.jpeg"
                            onChange={onVideoFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"> </p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="lg:mt-5 mt-0 md:col-span-2 lg:p-5 p-3 ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload4"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <p className=" " id="video-label">
                            Choose Video file
                          </p>
                          <input
                            id="file-upload4"
                            type="file"
                            accept=".mp4, .mkv, .mov, .avi"
                            name="videoFile"
                            onChange={onVideoFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">Mp4, MKV, MOV, AVI up to 250MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:mt-5 mt-0 md:col-span-2">
                <div className=" sm:rounded-md  ">
                  <div className="px-4 py-5  space-y-6 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="videoName"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Video Title
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="videoName"
                            id="videoName"
                            value={video.videoName}
                            onChange={handleVideoInputs}
                            className="focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-8 gap-6 sm:grid-cols-8">
                      <div className="lg:col-span-4 col-span-8 sm:col-span-4">
                        {' '}
                        <label
                          htmlFor="videoTags"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Tags
                        </label>
                        <div className="mt-1 flex rounded-md max-w-sm shadow-sm text-black">
                          <Chips
                            theme={theme(darkMode)[0]}
                            chipTheme={chipTheme(darkMode)[0]}
                            value={tags}
                            onChange={handleVideoTags}
                            suggestions={suggestions}
                            fromSuggestionsOnly={false}
                            fetchSuggestions={fetchSuggestions}
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-4 col-span-8  sm:col-span-4">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Category
                        </label>
                        <div className="  flex rounded-md shadow-sm">
                          <Dropdown
                            data={category}
                            setSelected={setSelectedCategory}
                            getSelected={selectedCategory}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="videoDescription"
                          name="description"
                          rows={3}
                          value={video.description}
                          onChange={handleVideoInputs}
                          className="dark:placeholder-dbeats-dark-alt focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                          placeholder="Any Behind the scenes you'll like your Audience to know!"
                        />
                      </div>
                    </div>

                    <div className="grid grid-col-2 gap-6 lg:pb-20">
                      <div className="grid lg:grid-cols-3 grid-col-1 gap-6">
                        <div className="col-span-2  sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Allow Attribution?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={attribution}
                              setSelected={setSelectedAttribution}
                              getSelected={selectedAttribution}
                            />
                          </div>
                        </div>

                        <div className="col-span-2  sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Commercial Use?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={commercialUse}
                              setSelected={setSelectedCommercialUse}
                              getSelected={selectedCommercialUse}
                            />
                          </div>
                        </div>

                        <div className="col-span-2  sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Derivative Works?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={derivativeWorks}
                              setSelected={setSelectedDerivativeWorks}
                              getSelected={selectedDerivativeWorks}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:px-4 lg:py-3 lg:text-right text-center sm:px-6">
            <input
              type="submit"
              onClick={PostData}
              value="Upload Video"
              className="inline-flex justify-center lg:py-2 py-1 lg:px-5 px-3 border border-transparent shadow-sm lg:text-lg text-md font-bold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-blue-500"
            ></input>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export const UploadMusic = (props) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);

  const genre = [{ name: 'Rock' }, { name: 'Jazz' }];

  const mood = [{ name: 'Happy' }, { name: 'Soulful' }];

  const attribution = [{ name: 'No Attribution' }, { name: 'Allow Attribution' }];

  const commercialUse = [{ name: 'Non Commercial' }, { name: 'Commercial Use' }];

  const derivativeWorks = [
    { name: 'No-Selection' },
    { name: 'No Derivative Works' },
    { name: 'Share-Alike' },
  ];

  const [selectedGenre, setSelectedGenre] = useState(genre[0].name);
  const [selectedMood, setSelectedMood] = useState(mood[0].name);
  const [selectedAttribution, setSelectedAttribution] = useState(attribution[0].name);
  const [selectedCommercialUse, setSelectedCommercialUse] = useState(commercialUse[0].name);
  const [selectedDerivativeWorks, setSelectedDerivativeWorks] = useState(derivativeWorks[0].name);

  const [track, setTrack] = useState({
    trackName: '',
    trackImage: '',
    trackFile: '',
    cid: '',
    genre: '',
    mood: '',
    tags: '',
    description: '',
    isrc: '',
    iswc: '',
    allowAttribution: '',
    commercialUse: '',
    derivativeWorks: '',
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setTrack({ ...track, [name]: value });
  };

  async function storeWithProgress() {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid) => {
      console.log('uploading files with cid:', cid);
      track.cid = cid;
    };
    const blob = new Blob([JSON.stringify(track)], { type: 'application/json' });

    const files = [track.trackFile, track.trackImage, new File([blob], 'meta.json')];
    const totalSize = track.trackFile.size;
    let uploaded = 0;
    const onStoredChunk = (size) => {
      uploaded += size;
      const pct = totalSize / uploaded;
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk });
  }

  console.log(track);

  const onFileChange = (e) => {
    if (e.target.name === 'trackFile') {
      track.trackFile = e.target.files[0];
      var trckName = e.target.files[0].name.replace(/\.[^/.]+$/, '');
      document.getElementById('trackName').value = trckName;
      track.trackName = trckName;
      document.getElementById('audio-label').textContent = trckName;
    } else if (e.target.name === 'trackImage') {
      track.trackImage = e.target.files[0];
      var trcImage = e.target.files[0].name.replace(/\.[^/.]+$/, '');
      document.getElementById('audio-thumbnail-label').textContent = trcImage;
    }
  };

  useEffect(() => {
    setTrack({
      ...track,
      genre: selectedGenre,
      mood: selectedMood,
      allowAttribution: selectedAttribution,
      commercialUse: selectedCommercialUse,
      derivativeWorks: selectedDerivativeWorks,
    });
  }, [
    selectedGenre,
    selectedCommercialUse,
    selectedDerivativeWorks,
    selectedAttribution,
    selectedMood,
  ]);

  const PostData = async (e) => {
    e.preventDefault();
    let formDatanft = new FormData();
    formDatanft.append('videoFile', track.trackFile);

    // if (document.getElementById('is_nft').checked) {
    //   await mintNFT(
    //     user.wallet_id,
    //     formDatanft,
    //     track.trackFile,
    //     track.trackName,
    //     track.description,
    //   );
    //   const apiKey =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhMzIwRGQxRDBBNTBmMUQyYjNGNmZGZDM0MUI3ODdkNTYzQzBFYjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDQ0ODE3MDg4MCwibmFtZSI6IkRCZWF0cyJ9.wGuicvEMGBKmKxqsiC4YhesIjBF11oP9EZXNYYN6w5k';
    //   const client = new NFTStorage({ token: apiKey });

    //   const metadata = await client.store({
    //     name: track.trackName,
    //     description: 'Minted at : ' + new Date(),
    //     image: track.trackImage,
    //     properties: { track: track.trackFile },
    //   });
    //   console.log(metadata.url);
    // }
    const {
      trackName,
      trackImage,
      trackFile,
      genre,
      mood,
      tags,
      description,
      isrc,
      iswc,
      allowAttribution,
      commercialUse,
      derivativeWorks,
    } = track;
    storeWithProgress(e.target.value).then(() => {
      let formData = new FormData(); // Currently empty
      formData.append('userName', user.username);
      formData.append('trackName', trackName);
      formData.append('genre', genre);
      formData.append('mood', mood);
      formData.append('tags', tags);
      formData.append('description', description);
      formData.append('isrc', isrc);
      formData.append('iswc', iswc);
      formData.append('allowAttribution', allowAttribution);
      formData.append('commercialUse', commercialUse);
      formData.append('derivativeWorks', derivativeWorks);
      formData.append('trackFile', trackFile, trackFile.name);
      formData.append('trackImage', trackImage, trackImage.name);
      formData.append('trackHash', track.cid);
      if (
        track.trackFile.length !== 0 &&
        track.trackImage.length !== 0 &&
        track.trackName.length !== 0 &&
        track.cid.length !== 0
      ) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then(function (response) {
            Noty.closeAll();
            new Noty({
              type: 'success',
              text: response.data,
              theme: 'metroui',
              layout: 'bottomRight',
            }).show();
            // console.log(response.data);
          })
          .catch((error) => {
            Noty.closeAll();
            new Noty({
              type: 'error',
              text: error.data,
              theme: 'metroui',
              layout: 'bottomRight',
            }).show();
            // console.log(error);
            // console.log(error.data);
          });
      } else {
        Noty.closeAll();
        new Noty({
          type: 'error',
          text: 'Choose Audio File & Fill other Details',
          theme: 'metroui',
          layout: 'bottomRight',
        }).show();
      }
    });
  };

  return (
    <Modal
      isOpen={props.showTrackUpload}
      className={
        darkMode
          ? 'h-max lg:w-max w-5/6 mt-20 mx-auto lg:mt-24  bg-dbeats-dark-primary rounded-xl '
          : 'h-max lg:w-max w-5/6 mt-20 mx-auto lg:mt-24  bg-gray-50 rounded-xl shadow-2xl'
      }
    >
      <div
        className={`${
          darkMode && 'dark'
        } font-proxima-reg z-100  transition duration-1000 ease-in-out mx-auto p-5`}
      >
        <h2 className="grid grid-cols-5 justify-items-center lg:text-2xl text-lg py-4 dark:bg-dbeats-dark-alt bg-white dark:text-white">
          <div className="col-span-4 pl-14">Upload Track</div>
          <div className="mr-7 flex justify-end w-full" onClick={props.handleCloseTrackUpload}>
            <i className="fas fa-times cursor-pointer"></i>
          </div>
        </h2>
        <hr />
        <form method="POST" encType="multipart/formdata">
          <div className=" bg-white text-gray-500  dark:bg-dbeats-dark-alt dark:text-gray-100   shadow-sm rounded-lg  lg:px-5 lg:py-5 px-2 py-1 mb-5 lg:max-h-full max-h-96  overflow-y-auto lg:overflow-hidden">
            <div className="md:grid md:grid-cols-3 md:gap-6  mt-5  ">
              <div className="md:col-span-1  ">
                <div className="lg:mt-5 mt-0 md:col-span-2 lg:p-5 p-3  ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center ">
                        <label
                          htmlFor="file-upload"
                          className="text-center relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <p className="text-center px-2" id="audio-thumbnail-label">
                            Choose Album Art
                          </p>
                          <input
                            id="file-upload"
                            type="file"
                            required
                            name="trackImage"
                            accept=".jpg,.png,.jpeg"
                            onChange={onFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"> </p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="lg:mt-5 mt-0 md:col-span-2 lg:p-5 p-3   ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload2"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span className="p-2 " id="audio-label">
                            Choose Audio file
                          </span>
                          <input
                            required
                            id="file-upload2"
                            type="file"
                            accept=".mp3"
                            name="trackFile"
                            onChange={onFileChange}
                            className="sr-only "
                          />
                        </label>
                        <p className="pl-1"></p>
                      </div>
                      <p className="text-xs text-gray-500">MP3 up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="lg:mt-5 mt-0 md:col-span-2 lg:p-5 p-3   ">
                  <label className="block text-sm font-medium text-gray-700"></label>
                  <div className=" mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center ">
                      <div className="flex text-sm text-gray-600">
                        <input
                          id="is_nft"
                          name="isNFT"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <p className="px-3">Mint NFT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:mt-5 mt-0 md:col-span-2">
                <div className=" sm:rounded-md  ">
                  <div className="px-4 py-5  space-y-6 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                      <div className="col-span-3 sm:col-span-3">
                        <label
                          htmlFor="trackName"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Track Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="trackName"
                            id="trackName"
                            value={track.trackName}
                            onChange={handleInputs}
                            className="focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-8">
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Tags
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="tags"
                            id="tags"
                            value={track.tags}
                            onChange={handleInputs}
                            className="focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                            placeholder=" "
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-2 col-span-4 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Genre
                        </label>
                        <div className="  flex rounded-md shadow-sm">
                          <Dropdown
                            data={genre}
                            setSelected={(genre) => setSelectedGenre(genre)}
                            getSelected={selectedGenre}
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-2 col-span-4 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Mood
                        </label>
                        <div className="  flex rounded-md shadow-sm">
                          <Dropdown
                            data={mood}
                            setSelected={setSelectedMood}
                            getSelected={selectedMood}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-8">
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Track ISRC
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="isrc"
                            id="isrc"
                            value={track.isrc}
                            onChange={handleInputs}
                            className=" dark:placeholder-dbeats-dark-alt    focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                            placeholder="eg. XX-XXX-YY-ZZZZZ"
                          />
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <label
                          htmlFor="iswc"
                          className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                        >
                          Track ISWC
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="iswc"
                            id="iswc"
                            placeholder="eg. T-123.456.789.C"
                            value={track.iswc}
                            onChange={handleInputs}
                            className=" dark:placeholder-dbeats-dark-alt    focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={track.description}
                          onChange={handleInputs}
                          className="dark:placeholder-dbeats-dark-alt focus:ring-dbeats-dark-primary border-0 dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  "
                          placeholder="Any Behind the scenes you'll like your Audience to know!"
                        />
                      </div>
                    </div>

                    <div className="grid grid-col-2 gap-6">
                      <div className="grid lg:grid-cols-3 grid-col-1 gap-6">
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Allow Attribution?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={attribution}
                              setSelected={setSelectedAttribution}
                              getSelected={selectedAttribution}
                            />
                          </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Commercial Use?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={commercialUse}
                              setSelected={setSelectedCommercialUse}
                              getSelected={selectedCommercialUse}
                            />
                          </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium dark:text-gray-100 text-gray-700"
                          >
                            Derivative Works?
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Dropdown
                              data={derivativeWorks}
                              setSelected={setSelectedDerivativeWorks}
                              getSelected={selectedDerivativeWorks}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:px-4 lg:py-3 lg:text-right text-center sm:px-6">
            <input
              type="submit"
              onClick={PostData}
              value="Upload Audio"
              className="cursor-pointer inline-flex justify-center lg:py-2 py-1 lg:px-5 px-3 border border-transparent shadow-sm lg:text-lg text-md  font-bold rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-indigo-700 transform transition delay-50 duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-blue-500"
            ></input>
          </div>
        </form>
      </div>
    </Modal>
  );
};
