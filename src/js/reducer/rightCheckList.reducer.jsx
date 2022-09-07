function createData(name, view, edit, add, deleted) {
  return { name, view, edit, add, deleted };
}
const initialState = {
  list: [
    createData("Dashboard", false, false, false, false),
    createData("Products", false, false, false, false),
    createData("Category", false, false, false, false),
    createData("Customers", false, false, false, false),
    createData("Orders", false, false, false, false),
    createData("Coupons", false, false, false, false),
    createData("Staff", false, false, false, false),
  ],
};
function rightCheckListReducer(state = initialState, action) {
  
  switch (action.type) {
    case "CHECKBOCLIST_SUCCESS":
      return { ...state, list: [] };

    default:
      return state;
  }
}
export default rightCheckListReducer;
