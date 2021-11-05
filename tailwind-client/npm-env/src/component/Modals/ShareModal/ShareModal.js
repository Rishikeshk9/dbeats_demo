import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ShareModal = ({
  show,
  handleClose,
  sharable_data,
  copybuttonText,
  setCopyButtonText,
}) => {
  const darkMode = useSelector((darkmode) => darkmode.toggleDarkMode);
  return (
    <>
      <Modal
        isOpen={show}
        className={`${
          darkMode && 'dark'
        } h-max lg:w-max w-5/6 bg-white mx-auto lg:mt-60 mt-32 shadow `}
      >
        <div className={``}>
          <h2 className="grid grid-cols-5 justify-items-center text-2xl py-4 dark:bg-dbeats-dark-primary dark:text-white">
            <div className="col-span-4 pl-14">Share link on</div>
            <div
              className="ml-5 cursor-pointer hover:bg-dbeats-dark-alt px-2.5 py-0.5"
              onClick={handleClose}
            >
              <i className="fas fa-times"></i>
            </div>
          </h2>
          <hr className="py-4 dark:bg-dbeats-dark-alt" />
          <div>
            <Container className="px-12 pb-4 dark:bg-dbeats-dark-alt">
              <Row>
                <Col className="flex lg:justify-around justify-center align-center flex-wrap">
                  <div className="px-1 py-1">
                    <WhatsappShareButton url={sharable_data}>
                      <WhatsappIcon iconFillColor="white" size={60} round={true} />
                    </WhatsappShareButton>
                  </div>
                  <div className="px-1 py-1">
                    <FacebookShareButton url={sharable_data}>
                      <FacebookIcon iconFillColor="white" size={60} round={true} />
                    </FacebookShareButton>
                  </div>
                  <div className="px-1 py-1">
                    <EmailShareButton url={sharable_data}>
                      <EmailIcon iconFillColor="white" size={60} round={true} />
                    </EmailShareButton>
                  </div>
                  <div className="px-1 py-1">
                    <PinterestShareButton url={sharable_data}>
                      <PinterestIcon iconFillColor="white" size={60} round={true} />
                    </PinterestShareButton>
                  </div>
                  <div className="px-1 py-1">
                    <TelegramShareButton url={sharable_data}>
                      <TelegramIcon iconFillColor="white" size={60} round={true} />
                    </TelegramShareButton>
                  </div>
                </Col>
              </Row>
              <Row>
                <CopyToClipboard
                  text={sharable_data}
                  className="block mx-auto p-2  my-3 mt-5 lg:w-96 w-full  text-white font-semibold rounded-lg bg-dbeats-light"
                >
                  <button type="submit" onClick={() => setCopyButtonText('Link Copied!')}>
                    {copybuttonText}
                  </button>
                </CopyToClipboard>
              </Row>
            </Container>
          </div>
        </div>
      </Modal>
    </>
  );
};
