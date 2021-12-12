import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import CreatorDashboard from '../../../../pages/Profile/ProfileSections/Store/creator-dashboard';

const UploadNFTModal = (props) => {
  const darkMode = useSelector((state) => state.toggleDarkMode);

  return (
    <div className={`${darkMode && 'dark'}`}>
      <Modal
        isOpen={props.showNFTUpload}
        className={
          darkMode
            ? 'h-max lg:w-max w-96 mx-auto 2xl:mt-32 lg:mt-16 mt-20 bg-dbeats-dark-primary dark:bg-dbeats-dark-secondary rounded-xl'
            : 'h-max lg:w-max   mx-auto 2xl:mt-32 lg:mt-16 mt-20 bg-gray-50 rounded-xl shadow-2xl'
        }
      >
        <CreatorDashboard></CreatorDashboard>
      </Modal>
    </div>
  );
};

export default UploadNFTModal;
