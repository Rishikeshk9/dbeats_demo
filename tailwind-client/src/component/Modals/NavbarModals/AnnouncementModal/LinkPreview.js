import React, { useState, useEffect } from 'react';
import { getLinkPreview } from 'link-preview-js';
import classes from './LinkPreview.module.css';

const LinkPreview = ({ linkurl }) => {
  const [linkData, setLinkData] = useState(null);

  getLinkPreview(linkurl)
    .then((data) => {
      setLinkData(data);
    })
    .catch();
  return (
    <>
      {linkData ? (
        <div className={`${classes.container} w-full h-max py-6 flex`}>
          <div
            className={`${classes.card_container} items-center rounded-lg w-96 h-max p-4  mx-auto bg-black text-white`}
          >
            <div className="flex items-center">
              <img src={linkData.images[0]} height="100%" width="100%" alt="link_image" />
            </div>
            <div className="py-2">
              <div className="flex items-center pb-1 ">
                <img src={linkData.favicons[0]} alt="logo" />
                <div className="font-bold pl-1">{linkData.siteName}</div>
              </div>
              <div>
                <div className="line-clamp-2 font-semibold text-sm">{linkData.title}</div>
                <div className="line-clamp-2 text-xs text-gray-300 break-word">
                  {linkData.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LinkPreview;
