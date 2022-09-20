import {
  categoryHandlerData,
  categoryStatus,
  searchProductData,
  categoryDelete,
  productHandlerData,
  productStatus,
  productDelete,
  searchHandlerData,
  orderHandlerData,
  orderCustomersHandlerData,
  customersStatus,
  customersHandler,
  searchCustomersData,
  customersDelete,
  orderUpdateData,
  couponsHandler,
  couponsStatus,
  couponsDelete,
  searchOrderData,
  layoutHandlerData,
  rightsHandlerData,
  roleHandlerData,
  addRoleHandlerData,
  updateRoleHandlerData,
  searchRoleData,
  menuHandlerData,
  updateMenuHandlerData,
  staffHandlerData,
  addingStaffData,
  updateStaffHandlerData,
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
  fetchProductSearchSuccess,
  fetchSearchSuccess,
  pageNumber,
  categoryPageNumber,
  fetchOrderListSuccess,
  fetchOrderListFailure,
  fetchCustomersSearchSuccess,
  fetchCustomersList,
  fetchCustomersListFailure,
  fetchCustomersListSuccess,
  fetchOrderList,
  orderPageNumber,
  customersPageNumber,
  orderCustomersPageNumber,
  fetchOrderCustomersListSuccess,
  fetchOrderCustomersList,
  fetchCouponsListSuccess,
  fetchCouponsList,
  pageNumberCoupons,
  fetchOrderSearchSuccess,
  fetchRoutingListSuccess,
  fetchRoutingListFailure,
  fetchRightsListSuccess,
  fetchRightsListFailure,
  fetchRoleListSuccess,
  fetchRoleListFailure,
  fetchRoleList,
  rolePageNumber,
  fetchRoleSearchSuccess,
  fetchMenuListSuccess,
  fetchMenuListFailure,
  fetchMenuList,
  fetchRoutingList,
  fetchStaffListSuccess,
  fetchStaffListFailure,
  fetchStaffList,
  addStaffMsg,
} from "../actions";
import { listBody } from "../../utils/Helper";

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
              alert("FETCH_CATEGORY => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE FETCH_CATEGORY DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_CATEGORY_STATUS":
        store.dispatch(loadingStart());
        categoryStatus(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("CHANGE_CATEGORY_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE CHANGE_CATEGORY_STATUS DISPATCHED ");
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
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("ON_DELETION => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION DISPATCHED ");
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
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("ON_SEARCH => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH DISPATCHED ");
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
              store.dispatch(fetchProductSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchProductListFailure());
              alert("ON_SEARCH_PRODUCT => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("ON_SEARCH_PRODUCT => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_PRODUCT DISPATCHED ");
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
              alert("FETCH_PRODUCT => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE FETCH_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_PRODUCT_STATUS":
        store.dispatch(loadingStart());
        productStatus(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("CHANGE_PRODUCT_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE CHANGE_PRODUCT_STATUS DISPATCHED ");
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
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("ON_DELETION_PRODUCT => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION":
        store.dispatch(loadingStart());
        productHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductListSuccess(res));
              store.dispatch(pageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchProductListFailure());
              alert("LOAD_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_CATEGORY_PAGINATION":
        store.dispatch(loadingStart());
        categoryHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
              store.dispatch(
                categoryPageNumber(action.payload.pagination.page)
              );
            } else {
              store.dispatch(fetchCategoryListFailure());
              alert("LOAD_CATEGORY_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE LOAD_CATEGORY_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_ORDER":
        store.dispatch(loadingStart());
        orderHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderListSuccess(res));
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("FETCH_ORDER => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE FETCH_ORDER DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_ORDER_CUSTOMERS":
        store.dispatch(loadingStart());
        orderCustomersHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderCustomersListSuccess(res));
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("FETCH_ORDER => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE FETCH_ORDER DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH_CUSTOMERS":
        store.dispatch(loadingStart());
        searchCustomersData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCustomersSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchCustomersListFailure());
              alert("ON_SEARCH_CUSTOMERS => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("ON_SEARCH_CUSTOMERS => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_CUSTOMERS":
        store.dispatch(loadingStart());
        customersHandler(action.payload)
          .then((res) => {
            if (res) {
              store.dispatch(fetchCustomersListSuccess(res));
            } else {
              store.dispatch(fetchCustomersListFailure());
              alert("FETCH_CUSTOMERS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE FETCH_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_CUSTOMERS_STATUS":
        store.dispatch(loadingStart());
        customersStatus(action.payload.id, action.payload.body)
          .then((res) => {
            if (res) {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("CHANGE_CUSTOMERS_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE CHANGE_CUSTOMERS_STATUS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION_CUSTOMERS":
        store.dispatch(loadingStart());
        customersDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("ON_DELETION_CUSTOMERS => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_CUSTOMERS":
        store.dispatch(loadingStart());

        customersHandler(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCustomersListSuccess(res));
              store.dispatch(
                customersPageNumber(action.payload.pagination.page)
              );
            } else {
              store.dispatch(fetchCustomersListFailure());
              alert("LOAD_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ORDER_UPDATION":
        store.dispatch(loadingStart());
        orderUpdateData(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("ORDER_UPDATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE ORDER_UPDATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ORDER_UPDATION_CUSTOMERS":
        store.dispatch(loadingStart());
        orderUpdateData(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(
                fetchOrderCustomersList(action.payload.defaultPayload)
              );
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("ORDER_UPDATION_CUSTOMERS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE ORDER_UPDATION_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_ORDER":
        store.dispatch(loadingStart());
        orderHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderListSuccess(res));
              store.dispatch(orderPageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("LOAD_PAGINATION_ORDER => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION_ORDER DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_ORDER_CUSTOMERS":
        store.dispatch(loadingStart());
        orderHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderCustomersListSuccess(res));
              store.dispatch(
                orderCustomersPageNumber(action.payload.pagination.page)
              );
            } else {
              store.dispatch(fetchOrderListFailure());
              alert("LOAD_PAGINATION_ORDER => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION_ORDER DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;

      case "FETCH_COUPONS":
        store.dispatch(loadingStart());
        couponsHandler(action.payload)
          .then((res) => {
            if (res) {
              store.dispatch(fetchCouponsListSuccess(res));
            } else {
              store.dispatch(fetchCustomersListFailure());
              alert("FETCH_COUPONS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE FETCH_COUPONS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_COUPONS_STATUS":
        store.dispatch(loadingStart());
        couponsStatus(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCouponsList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCouponsList(action.payload.defaultPayload));
              alert("CHANGE_COUPONS_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE CHANGE_COUPONS_STATUS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION_COUPONS":
        store.dispatch(loadingStart());
        couponsDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchCouponsList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCouponsList(action.payload.defaultPayload));
              alert("ON_DELETION_COUPONS => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION_COUPONS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_COUPONS":
        store.dispatch(loadingStart());

        couponsHandler(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCouponsListSuccess(res));
              store.dispatch(pageNumberCoupons(action.payload.pagination.page));
            } else {
              store.dispatch(fetchProductListFailure());
              alert("LOAD_PAGINATION_COUPONS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION_COUPONS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      ///
      case "ON_SEARCH_ORDER":
        store.dispatch(loadingStart());
        searchOrderData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchOrderSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchOrderListFailure());
              alert("ON_SEARCH_PRODUCT => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchOrderList(action.payload.defaultPayload));
              alert("ON_SEARCH_PRODUCT => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchOrderListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_ROUTES":
        store.dispatch(loadingStart());
        layoutHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoutingListSuccess(res));
            } else {
              store.dispatch(fetchRoutingListFailure());
              alert("FETCH_ROUTES => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchRoutingListFailure());
            alert("ERROR OCCURED WHILE FETCH_ROUTES DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_RIGHTS":
        store.dispatch(loadingStart());
        rightsHandlerData(action.payload)
          .then((res) => {
            // console.log(res);
            if (res.success) {
              store.dispatch(fetchRightsListSuccess(res));
            } else {
              store.dispatch(fetchRightsListFailure());
              alert("FETCH_RIGHTS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE FETCH_RIGHTS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_ROLE":
        store.dispatch(loadingStart());
        roleHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoleListSuccess(res));
            } else {
              store.dispatch(fetchRoleListFailure());
              alert("FETCH_ROLE => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchRoleListFailure());
            alert("ERROR OCCURED WHILE FETCH_ROLE DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ADD_ROLE":
        store.dispatch(loadingStart());

        addRoleHandlerData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoleList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchRoleList(action.payload.defaultPayload));
              alert("ADD_ROLE => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchRoleListFailure());
            alert("ERROR OCCURED WHILE ADD_ROLE DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "UPDATE_ROLE":
        store.dispatch(loadingStart());

        updateRoleHandlerData(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoleList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchRoleList(action.payload.defaultPayload));
              alert("UPDATE_ROLE => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchRoleListFailure());
            alert("ERROR OCCURED WHILE UPDATE_ROLE DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_ROLE":
        store.dispatch(loadingStart());
        roleHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoleListSuccess(res));
              store.dispatch(rolePageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchRoleListFailure());
              alert("LOAD_PAGINATION_ROLE => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchRoleListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION_ROLE DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH_ROLE":
        store.dispatch(loadingStart());
        searchRoleData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchRoleSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchRoleListFailure());
              // alert("ON_SEARCH_ROLE => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchRoleList(action.payload.defaultPayload));
              // alert("ON_SEARCH_ROLE => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchRoleListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_ROLE DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_MENU":
        store.dispatch(loadingStart());
        menuHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchMenuListSuccess(res));
            } else {
              store.dispatch(fetchMenuListFailure());
              alert("FETCH_MENU => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchMenuListFailure());
            alert("ERROR OCCURED WHILE FETCH_MENU DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "UPDATE_MENU":
        store.dispatch(loadingStart());
        updateMenuHandlerData(action.payload.id, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchMenuList(action.payload.defaultPayload));
              store.dispatch(
                fetchRoutingList(
                  listBody({
                    where: { isActive: true },
                    perPage: 10000,
                    page: 1,
                    sortBy: "createdAt",
                  })
                )
              );
            } else {
              store.dispatch(fetchMenuList(action.payload.defaultPayload));
              alert("UPDATE_MENU => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchMenuListFailure());
            console.error(err);
            alert("ERROR OCCURED WHILE UPDATE_MENU DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_STAFF":
        store.dispatch(loadingStart());
        staffHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchStaffListSuccess(res));
            } else {
              store.dispatch(fetchStaffListFailure());
              alert("FETCH_STAFF => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchStaffListFailure());
            alert("ERROR OCCURED WHILE FETCH_STAFF DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ADD_STAFF_DATA":
        store.dispatch(loadingStart());
        addingStaffData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(addStaffMsg(res.message));
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
              store.dispatch({ type: "JUMP_TO_PATH", payload: "/staff" });
            } else {
              store.dispatch(addStaffMsg(res.message));
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
            }
          })
          .catch((err) => {
            console.error(err);

            store.dispatch(fetchStaffListFailure());
            alert("ERROR OCCURED WHILE ADD_STAFF_DATA DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "UPDATE_STAFF_DATA":
        store.dispatch(loadingStart());
        updateStaffHandlerData(action.payload.cid, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch({ type: "STAFF_MSG", payload: res.message });
              store.dispatch({ type: "JUMP_TO_PATH", payload: "/staff" });
            } else {
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
              alert("ADD_STAFF_DATA => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            console.error(err);

            store.dispatch(fetchStaffListFailure());
            alert("ERROR OCCURED WHILE ADD_STAFF_DATA DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "UPDATE_PROFILE_DATA":
        store.dispatch(loadingStart());
        updateStaffHandlerData(action.payload.cid, action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch({ type: "STAFF_MSG", payload: res.message });
              store.dispatch({ type: "JUMP_TO_PATH", payload: "/dashboard" });
            } else {
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
              alert("ADD_STAFF_DATA => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            console.error(err);

            store.dispatch(fetchStaffListFailure());
            alert("ERROR OCCURED WHILE ADD_STAFF_DATA DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "UPDATE_STAFF_STATUS":
        store.dispatch(loadingStart());
        updateStaffHandlerData(action.payload.id, action.payload.body)
          .then((res) => {
            if (res) {
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchStaffList(action.payload.defaultPayload));
              alert("UPDATE_STAFF_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            console.error(err);

            store.dispatch(fetchStaffListFailure());
            alert("ERROR OCCURED WHILE UPDATE_STAFF_STATUS DISPATCHED ");
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
