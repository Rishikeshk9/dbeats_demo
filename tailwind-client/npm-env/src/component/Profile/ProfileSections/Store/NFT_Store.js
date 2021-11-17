import React from 'react';
import NFTCard from './NFTCard';

const NFT_Store = ({ NFTData }) => {
  return (
    <div className="px-5 h-max lg:col-span-5 col-span-6 w-full mt-16">
      {NFTData ? (
        <div className="flex flex-wrap w-full">
          {NFTData.map((nft, idx) => {
            if (nft.metadata) {
              return (
                <div key={idx} className="pb-8 px-7">
                  <NFTCard nft={nft} />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NFT_Store;
