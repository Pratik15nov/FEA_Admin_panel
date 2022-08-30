const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function customersReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CUSTOMERS_FAILURE":
      return { ...state, list: [] };
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    case "PAGE_NUMBER_CUSTOMERS":
      return { ...state, page: action.payload };
    case "FETCH_CUSTOMERS_SEARCH_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export default customersReducer;
