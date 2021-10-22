import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import { Container, Row, Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import axios from 'axios';

const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);

export const AnnouncementModal = (props) => {
  const [announcementText, setAnnouncementText] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setAnnouncementText(e.target.value);
  };

  const handleAnnouncement = () => {
    console.log('hello');
    const announcementData = {
      username: props.userData.username,
      announcement: announcementText,
    };
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/announcement`,
      data: announcementData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    props.setShowAnnouncement(false);
  };
  return (
    <Modal
      visible={props.showAnnouncement}
      className=""
      effect="fadeInUp"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      height="40%"
      width="40%"
    >
      <div className={`${darkMode && 'dark'}`}>
        <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4 dark:bg-dbeats-dark-primary bg-white dark:text-white">
          <div className="col-span-4 pl-14">Announcement Details</div>
          <div className="ml-5" onClick={props.handleCloseAnnouncement}>
            <i className="fas fa-times"></i>
          </div>
        </h2>
        <hr className="py-4 dark:bg-dbeats-dark-alt" />
        <div className="h-72 flex align-center">
          <Container className="px-12 pb-4 h-full dark:bg-dbeats-dark-alt">
            <Row>
              <Col className="align-center">
                <textarea
                  className="w-full h-36"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </Col>
            </Row>
            <Row className="w-full flex justify-center">
              <button
                type="submit"
                onClick={handleAnnouncement}
                className="mt-4 bg-white px-3 py-2 text-lg bg-dbeats-light text-white border-0 w-80 rounded-sm cursor-pointer "
              >
                Announce
              </button>
            </Row>
          </Container>
        </div>
        <hr className="py-2 dark:bg-dbeats-dark-alt" />
      </div>
    </Modal>
  );
};

export const UploadVideo = () => {};

export const UploadMusic = () => {};
