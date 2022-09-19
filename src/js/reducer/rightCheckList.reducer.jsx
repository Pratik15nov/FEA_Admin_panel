const initialState = {
  list: [
    {
      name: "Dashboard",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Products",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Category",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Customers",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Orders",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Coupons",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
    {
      name: "Staff",
      view: false,
      edit: false,
      add: false,
      deleted: false,
    },
  ],
};
function rightCheckListReducer(state = initialState, action) {
  // console.log("TRACK", action?.payload);
  // console.log("action?.type", action?.type);
  switch (action.type) {
    case "CHECKBOXLIST_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
export default rightCheckListReducer;
