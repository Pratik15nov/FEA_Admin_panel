import commonReducer from "./common.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";

export const rootReducer = {
  order: orderReducer,
  common: commonReducer,
  category: categoryReducer,
  product: productReducer,
};
