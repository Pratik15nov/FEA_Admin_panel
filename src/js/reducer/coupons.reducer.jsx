const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function couponsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_COUPONS_FAILURE":
      return { ...state, list: [] };
    case "FETCH_COUPONS_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    case "PAGE_NUMBER_COUPONS":
      return { ...state, page: action.payload };
    case "FETCH_COUPONS_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default couponsReducer;
