import categoryReducer from './category.reducer';
import productReducer from './product.reducer';

export const rootReducer = {
  category: categoryReducer,
  product: productReducer
}