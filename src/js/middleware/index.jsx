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
  loadingStart,
  loadingStop,
  fetchCategoryList,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
  fetchProductListFailure,
  fetchProductList,
  fetchProductListSuccess,
  fetchSearchSuccess,
  pageNumber,
  categoryPageNumber,
} from "../actions";

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
      case "FETCH_CATEGORY":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_CATEGORY_STATUS":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH":
        store.dispatch(loadingStart());
        searchHandlerData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchSearchSuccess(res.data));
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH_PRODUCT":
        store.dispatch(loadingStart());
        searchProductData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchProductListFailure());
            } else {
              alert("RESPONSE:FALSE => SEARCH NOT WORKING");
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            }
          })
          .catch((error) => {
            alert("ERROR OCCURED");
            store.dispatch(fetchProductListFailure());
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_PRODUCT":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_PRODUCT_STATUS":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION_PRODUCT":
        store.dispatch(loadingStart());
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
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION":
        store.dispatch(loadingStart());
        console.log("PAGE", action.payload.pagination.page);
        productHandlerData(action.payload)
          .then((res) => {
            console.log("res: ", res);
            if (res.success) {
              store.dispatch(fetchProductListSuccess(res));
              store.dispatch(pageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchProductListFailure());
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED IN LOAD_PAGINATION");
            store.dispatch(fetchProductListFailure());
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_CATEGORY_PAGINATION":
        store.dispatch(loadingStart());
        categoryHandlerData(action.payload)
          .then((res) => {
            console.log("res: ", res);
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
              store.dispatch(
                categoryPageNumber(action.payload.pagination.page)
              );
            } else {
              store.dispatch(fetchCategoryListFailure());
            }
          })
          .catch((err) => {
            alert("ERROR OCCURED IN LOAD_CATEGORY_PAGINATION");
            store.dispatch(fetchCategoryListFailure());
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;

      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
