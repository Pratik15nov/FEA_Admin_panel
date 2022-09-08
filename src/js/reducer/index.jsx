import commonReducer from "./common.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import orderCustomersReducer from "./ordercustomers.reducer";
import couponsReducer from "./coupons.reducer";
import customersReducer from "./customers.reducer";
import layoutFetchRoutes from "./layout.reducer";
<<<<<<< HEAD
import rightCheckListReducer from "./rightCheckList.reducer";
import rightsReducer from "./rights.reducer"
=======
import roleReducer from "./role.reducer";
import menuReducer from "./menu.reducer";

>>>>>>> b0b6ce7371e24b3c8e87c0edce835f964635eb4f
export const rootReducer = {
  rightchecklist: rightCheckListReducer,
  order: orderReducer,
  common: commonReducer,
  category: categoryReducer,
  product: productReducer,
  customers: customersReducer,
  ordercustomers: orderCustomersReducer,
  coupons: couponsReducer,
  layout: layoutFetchRoutes,
<<<<<<< HEAD
  rights: rightsReducer,
=======
  role: roleReducer,
  menu: menuReducer,
>>>>>>> b0b6ce7371e24b3c8e87c0edce835f964635eb4f
};
