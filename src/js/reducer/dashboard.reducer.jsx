const initialState = {};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {

    case "FETCH_DASHBOARD_FAILURE":
      return { ...state, list: [] };
    case "FETCH_DASHBOARD_SUCCESS":
      
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
