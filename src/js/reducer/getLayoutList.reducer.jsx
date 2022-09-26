const initialState = {
  list: [],
  totalCount: 0,
};

function getLayoutList(state = initialState, action) {
  switch (action.type) {
    case "FETCH_GETLAYOUTLIST_FAILURE":
      return { ...state, list: [] };
    case "FETCH_GETLAYOUTLIST_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };
    default:
      return state;
  }
}

export default getLayoutList;
