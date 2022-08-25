import { categoryHandlerData, categoryStatus } from '../../service/Auth.Service';
import { 
    fetchCategoryList,
    fetchCategoryListFailure,
    fetchCategoryListSuccess,
} from '../actions'

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
        case 'FETCH_CATEGORY':
            categoryHandlerData(action.payload).then(res => {
                if(res.success) {
                    store.dispatch(fetchCategoryListSuccess(res));
                } else {
                    store.dispatch(fetchCategoryListFailure());    
                }
            }).catch(err => {
                store.dispatch(fetchCategoryListFailure());
            })
        break;
        case 'CHANGE_CATEGORY_STATUS':
            categoryStatus(action.payload.id, action.payload.body).then(res => {
                console.log(res);
                if(res.success) {
                    store.dispatch(fetchCategoryList(action.payload.defaultPayload));
                } else {
                    store.dispatch(fetchCategoryList(action.payload.defaultPayload));
                }
            }).catch(err => {
                store.dispatch(fetchCategoryListFailure());
            })
            break;
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }

  //   try {
  //     if (action.type === "FETCH_CATEGORY_SUCCESS") {
  //       console.log("action.type: ", action.type);

  //       next(action);
  //     } else if (action.type === "FETCH_PRODUCT_SUCCESS") {
  //       console.log("action.type: ", action.type);
  //       next(action);
  //     } else {
  //       console.log("NOT_SUCCESS");
  //       next(action);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
};
