import commonReducer from "./common.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import orderCustomersReducer from "./ordercustomers.reducer";
import couponsReducer from "./coupons.reducer"
import customersReducer from "./customers.reducer";

export const rootReducer = {
  order: orderReducer,
  common: commonReducer,
  category: categoryReducer,
  product: productReducer,
  customers: customersReducer,
  ordercustomers: orderCustomersReducer,
  coupons: couponsReducer,
};

