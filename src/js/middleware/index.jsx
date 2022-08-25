import {
  categoryHandlerData,
  categoryStatus,
  categoryDelete,
  searchHandlerData,
} from "../../service/Auth.Service";
import {
  fetchCategoryList,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
  fetchSearchSuccess,
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
      case "ON_SEARCH":
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
          });
        break;
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
