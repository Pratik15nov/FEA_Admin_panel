const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function categoryList(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CATEGORYLIST_FAILURE":
      return { ...state, list: [] };
    case "FETCH_CATEGORYLIST_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    default:
      return state;
  }
}

export default categoryList;
