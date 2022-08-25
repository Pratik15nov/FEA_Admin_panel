export function fetchCategoryList(payload) {
  return { type: 'FETCH_CATEGORY', payload};
}

export function categoryStatusChange(payload) {
  return { type: 'CHANGE_CATEGORY_STATUS', payload};
}

export function fetchCategoryListFailure() {
  return { type: "FETCH_CATEGORY_FAILURE" };
}

export function fetchCategoryListSuccess(payload) {
  return { type: "FETCH_CATEGORY_SUCCESS", payload };
}

export function updatePageNumber(payload) {
  return { type: "UPDATE_PAGE_NUMBER", payload };
}

//Product

export function fetchProductList(payload) {
  return { type: 'FETCH_PRODUCT', payload};
}

export function productStatusChange(payload) {
  return { type: 'CHANGE_PRODUCT_STATUS', payload};
}

export function fetchProductListFailure() {
  return { type: "FETCH_PRODUCT_FAILURE" };
}

export function fetchProductListSuccess(payload) {
  return { type: "FETCH_PRODUCT_SUCCESS", payload };
}
