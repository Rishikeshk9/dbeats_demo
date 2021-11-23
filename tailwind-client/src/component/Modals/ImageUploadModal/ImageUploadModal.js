import axios from 'axios';
import Noty from 'noty';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import getCroppedImg from './cropImage';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

function makeStorageClient() {
  return new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBhNzk3MkY3QTRDNUNkZDJlOENBQzE1RDJCZjJBRUFlQTg1QmM3MzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjc1MTY1MTgyMjUsIm5hbWUiOiJEQmVhdHMifQ.16-okZlX7RmNcszqLq06lvzDkZ-Z8CHnmAIRXjQ2q5Q',
  });
}

const user = JSON.parse(window.localStorage.getItem('user'));

export const UploadCoverImageModal = ({
  show,
  handleClose,
  setCoverImage,
  loader,
  setLoader,
  darkMode,
}) => {
  //image Crop
  const [image, setImage] = useState({ preview: '', raw: '' });
  const wrapperRef = useRef(null);
  let coverImage_cid = '';
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  async function storeWithProgress() {
    const onRootCidReady = (cid) => {
      coverImage_cid = cid;
    };
    const blob = new Blob([JSON.stringify(image)], { type: 'application/json' });

    const files = [image.raw, new File([blob], 'meta.json')];
    const totalSize = image.raw.size;
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleUpload = async (e) => {
    setLoader(false);
    e.preventDefault();

    // const croppedImage = await getCroppedImg(image.preview, croppedAreaPixels, rotation);
    // console.log('donee', { croppedImage });
    // //setCroppedImage(croppedImage);
    // setCoverImage(croppedImage);

    storeWithProgress('upload cover image').then(() => {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('coverImage', image.raw);
      formData.append('imageHash', coverImage_cid);

      console.log(user.username);
      console.log(image.raw);
      console.log(coverImage_cid);

      if (image.raw.length !== 0) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/user/coverimage`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((res) => {
            setLoader(true);
            setCoverImage(res.data);
            setImage({
              raw: '',
            });
            handleClose();
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
  };

  return (
    <div>
      <Modal
        isOpen={show}
        className={`${darkMode && 'dark'} h-max min-h-1/4 lg:w-2/5 w-5/6 bg-white  mx-auto 
        2xl:mt-48 lg:mt-36 mt-32 shadow ring-0 outline-none rounded-md z-20`}
      >
        <div ref={wrapperRef} className="p-5 w-full">
          <div className="p-4 flex justify-center">
            {image.preview ? (
              // <div>
              //   <Cropper
              //     image={image.preview}
              //     crop={crop}
              //     aspect={4 / 3}
              //     onCropChange={setCrop}
              //     onRotationChange={setRotation}
              //     onCropComplete={onCropComplete}
              //     onZoomChange={setZoom}
              //     className="min-h-1/4"
              //   />
              // </div>
              <img src={image.preview} alt="background_img" className="2xl:h-80 lg:h-56 w-auto" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-evenly mt-3">
            <label class="bg-dbeats-light text-white font-bold px-5 py-2 rounded-lg cursor-pointer">
              <input type="file" style={{ display: 'none' }} onChange={handleChange} />
              Select Cover Image
            </label>
            {image.preview ? (
              <div className="flex items-center">
                <button
                  onClick={handleUpload}
                  className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg "
                >
                  Upload Image
                </button>
                <div
                  className="animate-spin rounded-full h-7 w-7 ml-3 border-t-2 border-b-2 border-green-600 "
                  hidden={loader}
                ></div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const UploadProfileImageModal = ({
  show,
  handleClose,
  setProfileImage,
  loader,
  setLoader,
  darkMode,
}) => {
  const [image, setImage] = useState({ preview: '', raw: '' });
  const wrapperRef = useRef(null);
  let profileImage_cid = '';

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  async function storeWithProgress() {
    const onRootCidReady = (cid) => {
      profileImage_cid = cid;
    };
    const blob = new Blob([JSON.stringify(image)], { type: 'application/json' });

    const files = [image.raw, new File([blob], 'meta.json')];
    const totalSize = image.raw.size;
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleUpload = async (e) => {
    setLoader(false);
    e.preventDefault();

    storeWithProgress('upload cover image').then(() => {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('profileImage', image.raw);
      formData.append('imageHash', profileImage_cid);

      console.log(user.username);
      console.log(image.raw);
      console.log(profileImage_cid);

      if (image.raw.length !== 0) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/user/profileimage`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((res) => {
            setProfileImage(res.data);
            setLoader(true);
            setImage({
              preview: '',
              raw: '',
            });
            handleClose();
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
  };

  return (
    <div>
      <Modal
        isOpen={show}
        className={`${darkMode && 'dark'} h-max min-h-1/4 lg:w-2/5 w-5/6 bg-white  mx-auto 
        2xl:mt-48 lg:mt-36 mt-32 shadow ring-0 outline-none rounded-md z-20`}
      >
        <div ref={wrapperRef} className="p-5 w-full">
          <div className="p-4 flex justify-center">
            {image.preview ? (
              <img src={image.preview} alt="background_img" className="2xl:h-80 lg:h-56 w-auto" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-evenly">
            <label class="bg-dbeats-light text-white font-bold px-5 py-2 mt-3 rounded-lg cursor-pointer">
              <input type="file" style={{ display: 'none' }} onChange={handleChange} />
              Select Profile Image
            </label>
            {image.preview ? (
              <div className="flex items-center">
                <button
                  onClick={handleUpload}
                  className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg "
                >
                  Upload Image
                </button>
                <div
                  className="animate-spin rounded-full h-7 w-7 ml-3 border-t-2 border-b-2 border-green-600 "
                  hidden={loader}
                ></div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
