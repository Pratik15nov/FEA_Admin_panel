const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function staffReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STAFF_FAILURE":
      return { ...state, list: [] };
    case "FETCH_STAFF_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };

    case "STAFF_PAGE_NUMBER":
      return { ...state, page: action.payload };
    case "STAFF_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default staffReducer;
