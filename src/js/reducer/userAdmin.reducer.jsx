const initialState = {
  list: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
};

function userAdminReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERADMIN_FAILURE":
      return { ...state, list: [] };
    case "FETCH_USERADMIN_SUCCESS":
      return {
        ...state,
        list: [
          ...action.payload.list[0].rights,
          { name: "Settings", _id: "12345678abc910", view: true },
        ],
        totalCount: action.payload.count,
      };
    default:
      return state;
  }
}

export default userAdminReducer;
