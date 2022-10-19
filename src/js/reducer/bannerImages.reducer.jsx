const initialState = {
  list: [],
};

function bannerImages(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BANNER_FAILURE":
      return { ...state, list: [] };
    case "FETCH_BANNER_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
}

export default bannerImages;
