const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
  searchValue:'',
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CATEGORY_FAILURE":
      return { ...state, list: [] };
    case "FETCH_CATEGORY_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    case "CATEGORY_PAGE_NUMBER":
      return { ...state, page: action.payload };
    case "FETCH_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default categoryReducer;
