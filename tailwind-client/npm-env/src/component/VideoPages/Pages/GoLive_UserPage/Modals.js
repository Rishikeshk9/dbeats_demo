// import React from 'react';
// import Modal from 'react-modal';

// export const DestinationModal = () => {
//   return (
//     <div>
//       <Modal
//         visible={showDestinationModal}
//         className="h-max w-max w-screen"
//         effect="fadeInUp"
//         aria-labelledby="contained-modal-title-vcenter"
//         width="90%"
//       >
//         <h2 className="grid grid-cols-5 justify-items-center rounded-t-xl dark:rounded-t-sm text-2xl py-4 dark:bg-dbeats-dark-alt bg-white dark:text-white">
//           <div className="col-span-4 pl-14">Add Multistream Platforms</div>
//           <div
//             className="mr-7 flex justify-end w-full"
//             onClick={() => setShowDestinationModal(false)}
//           >
//             <i className="fas fa-times cursor-pointer"></i>
//           </div>
//         </h2>

//         <hr />
//         <main className="lg:py-3 py-0.5  px-4 max-h-48 lg:max-h-96 sm:max-h-40 w-full overflow-y-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-5">
//             {multiStreamConnected.map((value, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="col-span-3 lg:col-span-1 bg-white-200 mx-8 border-1 border-gray-300 rounded lg:my-2 my-0.5 flex justify-around"
//                 >
//                   <img
//                     src={value.platform.logo}
//                     alt="logo"
//                     className="h-auto w-20 lg:h-auto lg:w-28 p-4"
//                   />
//                   <input
//                     type="checkbox"
//                     className="h-7 w-7 mx-3 dark:text-dbeats-dark-secondary text-dbeats-light focus:ring-dbeats-light border-gray-300 rounded self-center"
//                     value="check"
//                     selected={value.selected}
//                     onChange={() => {
//                       editPlatform(value, index);
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </main>
//         <hr />
//         <div className="flex-row lg:flex w-full my-5 justify-center align-center px-4">
//           <button
//             className="lg:w-2/3 w-full mx-auto lg:mx-2 my-1 rounded-md bg-dbeats-light text-white lg:p-2 p-1 lg:text-xl text-lg  font-semibold"
//             onClick={() => {
//               setModalShow(true);
//               setShowDestinationModal(false);
//             }}
//           >
//             Add Destination
//           </button>
//           <button
//             className="lg:w-1/3 w-full my-1 lg:mx-2 mx-auto rounded-md bg-green-500 text-white lg:p-2 p-1 lg:text-xl text-lg font-semibold"
//             onClick={createMultiStream}
//           >
//             Apply
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Modals;
