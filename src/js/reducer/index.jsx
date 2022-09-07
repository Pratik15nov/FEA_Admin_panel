import commonReducer from "./common.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import orderCustomersReducer from "./ordercustomers.reducer";
import couponsReducer from "./coupons.reducer";
import customersReducer from "./customers.reducer";
import layoutFetchRoutes from "./layout.reducer";
import roleReducer from "./role.reducer";
import menuReducer from "./menu.reducer";

export const rootReducer = {
  order: orderReducer,
  common: commonReducer,
  category: categoryReducer,
  product: productReducer,
  customers: customersReducer,
  ordercustomers: orderCustomersReducer,
  coupons: couponsReducer,
  layout: layoutFetchRoutes,
  role: roleReducer,
  menu: menuReducer,
};
