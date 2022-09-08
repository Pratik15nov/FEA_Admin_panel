const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function rightsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RIGHTS_FAILURE":
      return { ...state, list: [] };
    case "FETCH_RIGHTS_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    case "PAGE_NUMBER_RIGHTS":
      return { ...state, page: action.payload };
    case "FETCH_RIGHTS_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default rightsReducer;
