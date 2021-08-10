const loginReducer = (state = 0, action) => {
    switch (action.type) {
      case "userSignIn":
        state = action.payload;
        return state;
      case "userLogout":
        state = null;
        return state;
      default:
        return state;
    }
  };
  
  export default loginReducer;