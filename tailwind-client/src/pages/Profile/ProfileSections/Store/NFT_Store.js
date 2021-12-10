import React from 'react';
import NFTCard from './NFTCard';

const NFTStore = ({ NFTData }) => {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white  dark:bg-gradient-to-b dark:from-dbeats-dark-alt dark:to-dbeats-dark-alt mx-auto col-span-6 lg:col-span-5 md:col-span-6 xs:col-span-6 grid grid-flow-row   xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-3 grid-cols-1  gap-2 gap-x-0 pt-20">
      {NFTData ? (
        <>
          {NFTData.map((nft, idx) => {
            // for covalent we have to set the contract address
            if ('external_data' in nft) {
              nft.metadata = nft.external_data;
              nft.contract_address = '0x03160747b94be986261d9340d01128d4d5566383';
            }
            if (
              nft.metadata &&
              nft.contract_address === '0x03160747b94be986261d9340d01128d4d5566383'
            ) {
              return (
                <div
                  key={idx}
                  className=" self-center  col-span-1   rounded-lg mx-2 lg:m-2 transition-all duration-300 "
                >
                  <NFTCard nft={nft} />
                </div>
              );
            }
            return 0;
          })}
        </>
      ) : null}
    </div>
  );
};

export default NFTStore;
