import React from 'react';
import NFTCard from './NFTCard';

const NFT_Store = ({ NFTData }) => {
  return (
    <div className="w-full  mx-auto lg:col-span-5 md:col-span-3 xs:col-span-5 grid grid-flow-row   xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-3 grid-cols-1  gap-8 gap-x-0 mt-20">
      {NFTData ? (
        <>
          {NFTData.map((nft, idx) => {
            if (nft.metadata) {
              return (
                <div
                  key={idx}
                  className=" self-center mx-auto col-span-1 p-0.5 rounded-xl"
                  id="store-section"
                >
                  <NFTCard nft={nft} />
                </div>
              );
            }
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NFT_Store;
