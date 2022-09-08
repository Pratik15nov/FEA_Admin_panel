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
export function customersPageNumber(payload) {
  return { type: "PAGE_NUMBER_CUSTOMERS", payload };
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

// Order

export function onOrderSearch(payload) {
  return { type: "ON_SEARCH_ORDER", payload };
}

export function fetchOrderListFailure() {
  return { type: "FETCH_ORDER_FAILURE" };
}

export function fetchOrderListSuccess(payload) {
  return { type: "FETCH_ORDER_SUCCESS", payload };
}
export function fetchOrderCustomersListSuccess(payload) {
  return { type: "FETCH_ORDER_CUSTOMERS_SUCCESS", payload };
}

export function orderPageNumber(payload) {
  return { type: "ORDER_PAGE_NUMBER", payload };
}
export function orderCustomersPageNumber(payload) {
  return { type: "ORDER_CUSTOMERS_PAGE_NUMBER", payload };
}

export function fetchOrderSearchSuccess(payload) {
  return { type: "ORDER_SEARCH_SUCCESS", payload };
}
export function loadPaginationOrder(payload) {
  return { type: "LOAD_PAGINATION_ORDER", payload };
}
export function loadPaginationOrderCustomers(payload) {
  return { type: "LOAD_PAGINATION_ORDER_CUSTOMERS", payload };
}

export function fetchOrderList(payload) {
  return { type: "FETCH_ORDER", payload };
}
export function fetchOrderCustomersList(payload) {
  return { type: "FETCH_ORDER_CUSTOMERS", payload };
}
export function sendOrderUpdation(payload) {
  return { type: "ORDER_UPDATION", payload };
}
export function sendOrderUpdationCustomers(payload) {
  return { type: "ORDER_UPDATION_CUSTOMERS", payload };
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
//coupons

export function fetchCouponsList(payload) {
  return { type: "FETCH_COUPONS", payload };
}
export function fetchCouponsListSuccess(payload) {
  return { type: "FETCH_COUPONS_SUCCESS", payload };
}
export function couponsStatusChange(payload) {
  return { type: "CHANGE_COUPONS_STATUS", payload };
}
export function onDeletionCoupons(payload) {
  return { type: "ON_DELETION_COUPONS", payload };
}
export function onCouponsloadingPagination(payload) {
  return { type: "LOAD_PAGINATION_COUPONS", payload };
}
export function pageNumberCoupons(payload) {
  return { type: "PAGE_NUMBER_COUPONS", payload };
}

// LAYOUT ROUTING

export function fetchRoutingList(payload) {
  return { type: "FETCH_ROUTES", payload };
}

export function fetchRoutingListFailure() {
  return { type: "FETCH_ROUTES_FAILURE" };
}

export function fetchRoutingListSuccess(payload) {
  return { type: "FETCH_ROUTES_SUCCESS", payload };
}
// export function checkBoxList(payload) {
//   return { type: "CHECKBOCLIST", payload };
// }

// export function checkBoxListSuccess(payload) {
//   return { type: "CHECKBOCLIST_SUCCESS", payload };
// }

export function fetchRightsList(payload) {
  return { type: "FETCH_RIGHTS", payload };
}

export function rightsStatusChange(payload) {
  return { type: "CHANGE_RIGHTS_STATUS", payload };
}

export function fetchRightsListFailure() {
  return { type: "FETCH_RIGHTS_FAILURE" };
}
export function fetchRightsListSuccess(payload) {
  return { type: "FETCH_RIGHTS_SUCCESS", payload };
}
export function onDeletionRights(payload) {
  return { type: "ON_DELETION_RIGHTS", payload };
}
export function onRightsSearch(payload) {
  return { type: "ON_SEARCH_RIGHTS", payload };
}
export function fetchRightsSearchSuccess(payload) {
  return { type: "FETCH_RIGHTS_SEARCH_SUCCESS", payload };
}
export function rightsCategoryPagination(payload) {
  return { type: "LOAD_CATEGORY_PAGINATION", payload };
}

// ROLE

export function fetchRoleList(payload) {
  return { type: "FETCH_ROLE", payload };
}
export function fetchRoleListSuccess(payload) {
  return { type: "FETCH_ROLE_SUCCESS", payload };
}

export function fetchRoleListFailure() {
  return { type: "FETCH_ROLE_FAILURE" };
}

export function addRoleToData(payload) {
  return { type: "ADD_ROLE", payload };
}

export function updateActionRoleData(payload) {
  return { type: "UPDATE_ROLE", payload };
}

export function loadPaginationRole(payload) {
  return { type: "LOAD_PAGINATION_ROLE", payload };
}
export function rolePageNumber(payload) {
  return { type: "ROLE_PAGE_NUMBER", payload };
}

export function onRoleSearch(payload) {
  return { type: "ON_SEARCH_ROLE", payload };
}
export function fetchRoleSearchSuccess(payload) {
  return { type: "ROLE_SEARCH_SUCCESS", payload };
}

// menu

export function fetchMenuList(payload) {
  return { type: "FETCH_MENU", payload };
}
export function fetchMenuListSuccess(payload) {
  return { type: "FETCH_MENU_SUCCESS", payload };
}

export function fetchMenuListFailure() {
  return { type: "FETCH_MENU_FAILURE" };
}
export function updateMenuData(payload) {
  return { type: "UPDATE_MENU", payload };
}
