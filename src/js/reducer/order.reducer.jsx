const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ORDER_FAILURE":
      return { ...state, list: [] };
    case "FETCH_ORDER_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    case "ORDER_PAGE_NUMBER":
      return { ...state, page: action.payload };
    case "ORDER_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default orderReducer;
