export function fetchCategoryListFailure() {
  return { type: "FETCH_CATEGORY_FAILURE" };
}

export function fetchCategoryListSuccess(payload) {
  return { type: "FETCH_CATEGORY_SUCCESS", payload };
}

export function updatePageNumber(payload) {
  return { type: "UPDATE_PAGE_NUMBER", payload };
}

export function fetchProductListFailure() {
  return { type: "FETCH_PRODUCT_FAILURE" };
}

export function fetchProductListSuccess(payload) {
  return { type: "FETCH_PRODUCT_SUCCESS", payload };
}
