import {
  categoryHandlerData,
  categoryStatus,
  categoryDelete,
  productHandlerData,
  productStatus,
  productDelete,
  searchProductData,
} from "../../service/Auth.Service";
import {
  fetchCategoryList,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
  fetchProductList,
  fetchProductListSuccess,
  fetchProductListFailure,
} from "../actions";

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
      case "FETCH_CATEGORY":
        categoryHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
            } else {
              store.dispatch(fetchCategoryListFailure());
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchCategoryListFailure());
          });
        break;
      case "CHANGE_CATEGORY_STATUS":
        categoryStatus(action.payload.id, action.payload.body)
          .then((res) => {
            console.log(res);
            if (res.success) {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            } else {
              alert("RESPONSE:FALSE => STATUS NOT CHANGED");
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchCategoryListFailure());
          });
        break;
      case "ON_DELETION":
        categoryDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            } else {
              alert("RESPONSE:FALSE => DELETION NOT CHANGED");
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchCategoryListFailure());
          });
        break;
      case "FETCH_PRODUCT":
        productHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductListSuccess(res));
            } else {
              store.dispatch(fetchProductListFailure());
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
          });
        break;
      case "CHANGE_PRODUCT_STATUS":
        productStatus(action.payload.id, action.payload.body)
          .then((res) => {
            console.log(res);
            if (res.success) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              alert("RESPONSE:FALSE => STATUS NOT CHANGED");
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
          });
        break;
      case "ON_DELETION_PRODUCT":
        productDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              alert("RESPONSE:FALSE => DELETION NOT CHANGED");
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
          });
        break;
      case "ON_SEARCH_PRODUCT":
        searchProductData(action.payload.body)
          .then((res) => {
            console.log(res)
            if (res.success) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              alert("RESPONSE:FALSE => DELETION NOT CHANGED");
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
          });
        break;
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
