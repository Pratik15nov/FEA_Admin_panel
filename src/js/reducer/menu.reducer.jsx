const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MENU_FAILURE":
      return { ...state, list: [] };
    case "FETCH_MENU_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };

    case "MENU_PAGE_NUMBER":
      return { ...state, page: action.payload };
    case "MENU_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default menuReducer;
