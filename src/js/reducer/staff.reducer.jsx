const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
  msg: null,
  jumpTo: null,
};

function staffReducer(state = initialState, action) {
  switch (action.type) {
    case "JUMP_TO_PATH":
      return { ...state, jumpTo: action.payload };
    case "UPDATE_STATE_LINK":
      return { ...state, jumpTo: null };
    case "CLEAR_JUMP_TO_PATH":
      return { ...state, jumpTo: null };
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
    case "STAFF_MSG":
      return { ...state, msg: action.payload };
    default:
      return state;
  }
}

export default staffReducer;
