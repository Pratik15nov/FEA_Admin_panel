export function fetchCategoryList(payload) {
  return { type: "FETCH_CATEGORY", payload };
}

export function categoryStatusChange(payload) {
  return { type: "CHANGE_CATEGORY_STATUS", payload };
}

export function onDeletion(payload) {
  return { type: "ON_DELETION", payload };
}
export function onSearch(payload) {
  return { type: "ON_SEARCH", payload };
}
export function fetchSearchSuccess(payload) {
  return { type: "FETCH_SEARCH_SUCCESS", payload };
}

>>>>>>> 17bc952318abadda4b7ce4caaefc90c9b03337cf
export function fetchCategoryListFailure() {
  return { type: "FETCH_CATEGORY_FAILURE" };
}

export function fetchCategoryListSuccess(payload) {
  return { type: "FETCH_CATEGORY_SUCCESS", payload };
}

//Product

export function fetchProductList(payload) {
  return { type: "FETCH_PRODUCT", payload };
}

export function productStatusChange(payload) {
  return { type: "CHANGE_PRODUCT_STATUS", payload };
}

export function fetchProductListFailure() {
  return { type: "FETCH_PRODUCT_FAILURE" };
}

export function fetchProductListSuccess(payload) {
  return { type: "FETCH_PRODUCT_SUCCESS", payload };
}

export function onDeletionProduct(payload) {
  return { type: "ON_DELETION_PRODUCT", payload };
}
export function onProductSearch(payload) {
  return { type: "ON_SEARCH_PRODUCT", payload };
}