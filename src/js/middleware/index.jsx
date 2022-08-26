import {
  categoryHandlerData,
  categoryStatus,
  searchProductData,
  categoryDelete,
  productHandlerData,
  productStatus,
  productDelete,
  searchHandlerData,
} from "../../service/Auth.Service";
import {
  fetchCategoryList,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
  fetchProductListFailure,
  fetchProductList,
  fetchProductListSuccess,
  fetchSearchSuccess,
  fetchProductSearchSuccess,
} from "../actions";

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
      case "FETCH_CATEGORY":
        categoryHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
              // store.dispatch(setSearchValuesCategory(action.payload.body.searchText))
             
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
      case "ON_SEARCH":
        searchHandlerData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchSearchSuccess(res.data));
              // store.dispatch(setSearchValuesCategory(action.payload.body.searchText))
            } else if (res.success === false) {
              store.dispatch(fetchCategoryListFailure());
            } else {
              alert("RESPONSE:FALSE => SEARCH NOT WORKING");
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchCategoryListFailure());
          });
        break;
      case "ON_SEARCH_PRODUCT":
        searchProductData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchProductListFailure());
              // alert("RESPONSE:FALSE => STATUS NOT CHANGED");
            } else {
              // alert("RESPONSE:FALSE => SEARCH NOT WORKING");
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
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
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
