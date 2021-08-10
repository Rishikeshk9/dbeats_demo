const roomId = (state = 0, action) => {
  switch (action.type) {
    case "setroomId":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default roomId;
  