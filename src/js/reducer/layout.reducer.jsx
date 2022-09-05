const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10000,
};

function layoutFetchRoutes(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ROUTES_FAILURE":
      return { ...state, list: [] };
    case "FETCH_ROUTES_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    default:
      return state;
  }
}

export default layoutFetchRoutes;
