const initialState = {
  list: [],
  totalCount: 0,
};

function selectedRightList(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SELECTED_RIGHTS_FAILURE":
      return { ...state, list: [] };
    case "FETCH_SELECTED_RIGHTS_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
        totalCount: action.payload.count,
      };

    default:
      return state;
  }
}

export default selectedRightList;
