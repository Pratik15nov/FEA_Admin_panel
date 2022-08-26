import commonReducer from './common.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';

export const rootReducer = {
  common: commonReducer,
  category: categoryReducer,
  product: productReducer
}