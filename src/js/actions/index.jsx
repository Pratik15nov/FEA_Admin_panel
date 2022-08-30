export function loadingStart() {
  return { type: "FETCH_DATA_START" };
}
export function loadingStop() {
  return { type: "FETCH_DATA_STOP" };
}

export function fetchCategoryList(payload) {
  return { type: "FETCH_CATEGORY", payload };
}
export function loadingPagination(payload) {
  return { type: "LOAD_PAGINATION", payload };
}

export function loadingCategoryPagination(payload) {
  return { type: "LOAD_CATEGORY_PAGINATION", payload };
}

export function pageNumber(payload) {
  return { type: "PAGE_NUMBER", payload };
}
export function categoryPageNumber(payload) {
  return { type: "CATEGORY_PAGE_NUMBER", payload };
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

//Customers
export function fetchCustomersList(payload) {
  return { type: "FETCH_CUSTOMERS", payload };
}
export function customersStatusChange(payload) {
  return { type: "CHANGE_CUSTOMERS_STATUS", payload };
}
export function onCustomersSearch(payload) {
  return { type: "ON_SEARCH_CUSTOMERS", payload };
}
export function onCustomersloadingPagination(payload) {
  return { type: "LOAD_PAGINATION_CUSTOMERS", payload };
}
export function fetchCustomersListSuccess(payload) {
  return { type: "FETCH_CUSTOMERS_SUCCESS", payload };
}
export function onDeletionCustomers(payload) {
  return { type: "ON_DELETION_CUSTOMERS", payload };
}

export function fetchCustomersSearchSuccess(payload) {
  return { type: "FETCH_CUSTOMERS_SEARCH_SUCCESS", payload };
}
export function fetchCustomersListFailure() {
  return { type: "FETCH_CUSTOMERS_FAILURE" };
}
