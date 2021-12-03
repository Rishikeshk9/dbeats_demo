import React, { useState } from 'react';

const NFTCard = ({ nft }) => {
  //console.log(nft);

  const [seeMore, setSeeMore] = useState(false);
  const [nameSeeMore, setNameSeeMore] = useState(false);
  const handleSeeMore = () => setSeeMore(!seeMore);
  const handleNameSeeMore = () => setNameSeeMore(!seeMore);

  return (
    <div className="dark:bg-gradient-to-b min-h-full  hover:border-gray-500 dark:from-dbeats-dark-secondary dark:to-dbeats-dark-secondary  dark:hover:bg-gradient-to-b  dark:hover:from-green-400 dark:hover:via-dbeats-dark-primary  dark:hover:to-dbeats-dark-primary bg-gradient-to-b from-white to-white dark:hover:bg-opacity-10 hover:bg-opacity-90 hover:bg-gradient-to-b hover:from-white hover:via-blue-50 hover:to-green-50   group  backdrop-blur-2xl  backdrop-filter dark:hover:backdrop-blur-2xl  dark:hover:backdrop-filter   shadow-sm  hover:shadow-md cursor-pointer w-full  rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
      <div className="relative mt-2 mx-2">
        <div className=" h-full w-full max-h-100 lg:h-56    rounded-md overflow-hidden">
          <img
            // `https://ipfs.io/ipfs/` + nft.metadata.image.split('ipfs://')[1] for nftport
            src={nft.metadata.image}
            alt="ipfs"
            className="object-cover w-full h-full"
          />
          {nft.image}
        </div>

        <div className="absolute bottom-0 left-0 -mb-4 ml-3 flex flex-row">
          <div className="h-10 w-10 flex items-center justify-center text-xl bg-white dark:bg-dbeats-dark-secondary  bg-opacity-20 dark:bg-opacity-10 dark:hover:bg-opacity-80  dark:backdrop-blur-md  backdrop-filter hover:bg-opacity-25  backdrop-blur-md hover:bg-red-500 text-red-300 hover:text-white rounded-2xl shadow-sm dark:shadow-md  transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="h-10 w-16 ml-2 bg-white dark:bg-dbeats-dark-secondary bg-opacity-20  dark:bg-opacity-10 hover:bg-opacity-25 dark:hover:bg-opacity-80 dark:backdrop-blur-md  backdrop-filter  backdrop-blur-md hover:bg-dbeats-light    grad flex items-center justify-center font-medium text-white hover:text-white rounded-2xl shadow-sm dark:shadow-md  transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span className="group-hover:text-white text-white ml-2"></span>
          </div>
        </div>
      </div>

      {/* {nft.name} */}
      <div className="pt-10 pb-6 w-full px-4" style={{ minHeight: '145px' }}>
        <h1 className="font-medium leading-none text-base tracking-wider text-gray-900 dark:text-white">
          <p
            className={`${!nameSeeMore ? 'line-clamp-2' : ''} mr-2 mt-1 `}
            style={{ wordBreak: 'break-words' }}
          >
            {nft.metadata.name.split('\n').map(function (item) {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            })}
          </p>
          {nft.metadata.name.split(/\r\n|\r|\n/).length > 2 ? (
            <p
              className="cursor-pointer text-md hover:underline text-gray-600 pt-2"
              onClick={() => setNameSeeMore(!nameSeeMore)}
            >
              {nameSeeMore ? '...see less' : '...see more'}
            </p>
          ) : null}
        </h1>

        {/* {nft.description} */}
        {nft.metadata.description ? (
          <div className=" leading-none text-base tracking-wider text-gray-900 dark:text-gray-200 mt-2">
            <p
              className={`${!seeMore ? 'line-clamp-1' : ''} mr-2`}
              style={{ wordBreak: 'break-words' }}
            >
              {nft.metadata.description.split('\n').map(function (item) {
                return (
                  <>
                    {item}
                    <br />
                  </>
                );
              })}
            </p>
            {nft.metadata.description.split(/\r\n|\r|\n/).length > 2 ? (
              <p
                className="cursor-pointer text-md hover:underline text-gray-600 mt-2"
                onClick={() => setSeeMore(!seeMore)}
              >
                {seeMore ? '...see less' : '...see more'}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NFTCard;
