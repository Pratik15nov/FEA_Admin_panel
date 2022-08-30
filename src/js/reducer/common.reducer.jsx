const initialState = {
    loading: false
  };
  
  function commonReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_DATA_START":
            return { ...state, loading: true };
        case "FETCH_DATA_STOP":
            return { ...state, loading: false };
        default:
            return state;
    }
  }
  
  export default commonReducer;
  