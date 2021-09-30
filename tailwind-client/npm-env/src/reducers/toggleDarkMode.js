const initialState = true;

const toggleDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case 'DARKMODETOGGLE':
      return state ? false : true;

    default:
      return state;
  }
};

export default toggleDarkMode;
