import React from 'react';
import NFTCard from './NFTCard';

const NFT_Store = ({ NFTData }) => {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-alt dark:to-dbeats-dark-alt mx-auto col-span-6 lg:col-span-5 md:col-span-6 xs:col-span-6 grid grid-flow-row   xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-3 grid-cols-1  gap-2 gap-x-0 pt-20">
      {NFTData ? (
        <>
          {NFTData.map((nft, idx) => {
            if (nft.metadata) {
              return (
                <div
                  key={idx}
                  className=" self-center  col-span-1   rounded-lg mx-2 lg:m-2 transition-all duration-300 "
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
