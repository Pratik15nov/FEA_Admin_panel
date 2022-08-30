import commonReducer from './common.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import customersReducer from './customers.reducer';

export const rootReducer = {
  common: commonReducer,
  category: categoryReducer,
  product: productReducer,
  customers: customersReducer
}