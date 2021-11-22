import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const ImageUploadModal = ({ show, handleClose, setProfileImage }) => {
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

  const [image, setImage] = useState({ preview: '', raw: '' });
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

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
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);
  };

  return (
    <div>
      <Modal
        isOpen={show}
        className={`${darkMode && 'dark'} h-max min-h-1/4 lg:w-2/5 w-5/6 bg-white  mx-auto 
        2xl:mt-48 lg:mt-36 mt-32 shadow ring-0 outline-none rounded-md `}
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
              Select Image
            </label>
            {image.preview ? (
              <button
                onClick={handleUpload}
                className="bg-green-600 text-white font-bold px-5 py-2 mt-3 rounded-lg "
              >
                Upload Image
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploadModal;
