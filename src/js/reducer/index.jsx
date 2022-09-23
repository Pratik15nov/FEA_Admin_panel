import commonReducer from "./common.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import orderCustomersReducer from "./ordercustomers.reducer";
import couponsReducer from "./coupons.reducer";
import customersReducer from "./customers.reducer";
import layoutFetchRoutes from "./layout.reducer";
import rightCheckListReducer from "./rightCheckList.reducer";
import rightsReducer from "./rights.reducer";
import roleReducer from "./role.reducer";
import menuReducer from "./menu.reducer";
import staffReducer from "./staff.reducer";
import userAdminReducer from "./userAdmin.reducer";
import categoryList from "./categoryList.reducer";

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
  rights: rightsReducer,
  role: roleReducer,
  menu: menuReducer,
  staff: staffReducer,
  userAdmin: userAdminReducer,
  categoryList: categoryList,
};
