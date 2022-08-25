export const loggerMiddleware = (store) => (next) => (action) => {
  if (action.type === "FETCH_CATEGORY_SUCCESS") {
    console.log("action.type: ", action.type);
    next(action);
  }
   else {
    console.log("NOT SUCCESS");
    next(action);
  }
};
