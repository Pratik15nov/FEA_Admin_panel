export function fetchCategoryList(payload) {
  return { type: "FETCH_CATEGORY", payload };
}
export function updatePageNumber(payload) {
  return { type: "UPDATE_PAGE_NUMBER", payload };
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

export function fetchProductSearchSuccess(payload) {
  return { type: "FETCH_PRODUCT_SEARCH_SUCCESS", payload };
}

export function setSearchValuesCategory(payload) {
  return { type: "SEARCH_VALUE_CATEGORY", payload };
}
