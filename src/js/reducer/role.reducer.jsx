const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function roleReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ROLE_FAILURE":
      return { ...state, list: [] };
    case "FETCH_ROLE_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };

    case "ROLE_PAGE_NUMBER":
      return { ...state, page: action.payload };
    case "ROLE_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default roleReducer;
