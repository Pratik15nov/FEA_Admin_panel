import { post, remove, patch, put, get } from "./Web.Request";
import { ENDPOINTURL } from "../utils/Helper";

export const categoryHandlerData = (body) => {
  return post(`${ENDPOINTURL}/category/list`, body);
};

export const categoryDelete = (id) => {
  return remove(`${ENDPOINTURL}/category/${id}`);
};

export const categoryStatus = (id, body) => {
  return put(`${ENDPOINTURL}/category/statusChange/${id}`, body);
};

export const categoryEditHandler = (id, body) => {
  return patch(`${ENDPOINTURL}/category/${id}`, body);
};

export const categoryHndlerData = (id) => {
  return get(`${ENDPOINTURL}/category/${id}`);
};
export const categoryAddHandler = (body) => {
  return post(`${ENDPOINTURL}/category`, body);
};

export const searchHandlerData = (body) => {
  return post(`${ENDPOINTURL}/category/search`, body);
};

export const productEditHandlerdata = (id, body) => {
  return patch(`${ENDPOINTURL}/product/${id}`, body);
};

export const productStatus = (id, body) => {
  return put(`${ENDPOINTURL}/product/${id}`, body);
};
export const ProductDataHndlerData = (id) => {
  return get(`${ENDPOINTURL}/product/${id}`);
};
export const productAddHandler = (body) => {
  return post(`${ENDPOINTURL}/product`, body);
};
export const productHandlerData = (body) => {
  return post(`${ENDPOINTURL}/product/list`, body);
};
export const searchProductData = (body) => {
  return post(`${ENDPOINTURL}/product/search`, body);
};
export const productDelete = (id) => {
  return remove(`${ENDPOINTURL}/product/${id}`);
};

export const orderHandlerData = (body) => {
  return post(`${ENDPOINTURL}/order/list`, body);
};

export const orderCustomersHandlerData = (body) => {
  return post(`${ENDPOINTURL}/order/list`, body);
};
export const customersEditHandlerdata = (id, body) => {
  return patch(`${ENDPOINTURL}/user/${id}`, body);
};
export const customersStatus = (id, body) => {
  return put(`${ENDPOINTURL}/user/${id}`, body);
};
export const customersDataHndlerData = (id) => {
  return get(`${ENDPOINTURL}/user/${id}`);
};
export const customersHandler = (body) => {
  return post(`${ENDPOINTURL}/user/list`, body);
};
export const customersHandlerData = (id) => {
  return get(`${ENDPOINTURL}/user/${id}`);
};
export const searchCustomersData = (body) => {
  return post(`${ENDPOINTURL}/user/search`, body);
};
export const customersDelete = (id) => {
  return remove(`${ENDPOINTURL}/user/${id}`);
};

export const orderUpdateData = (id, body) => {
  return patch(`${ENDPOINTURL}/order/${id}`, body);
};

//COUPONS
export const couponsHandler = (body) => {
  return post(`${ENDPOINTURL}/promocode/list`, body);
};
export const couponsStatus = (id, body) => {
  return patch(`${ENDPOINTURL}/promocode/${id}`, body);
};
export const couponsDelete = (id) => {
  return remove(`${ENDPOINTURL}/promocode/${id}`);
};
export const couponsHndlerData = (body) => {
  return post(`${ENDPOINTURL}/promocode/list`, body);
};
export const couponsAddHandler = (body) => {
  return post(`${ENDPOINTURL}/promocode`, body);
};

export const couponsEditHandler = (id, body) => {
  return patch(`${ENDPOINTURL}/promocode/${id}`, body);
};

export const searchOrderData = (body) => {
  return post(`${ENDPOINTURL}/order/search`, body);
};

//CHECKING SETTINGS

export const loginCheck = (body) => {
  return post(`${ENDPOINTURL}/adminUser/signin`, body);
};

export const afterLoginCheck = (body) => {
  return post(`${ENDPOINTURL}/adminUser/check`, body);
};

//CEHCKING DONE

// ************
// menu apis
export const layoutHandlerData = (body) => {
  return post(`${ENDPOINTURL}/Menu/list`, body);
};
//ROLE DONE

// ************

export const roleHandler = (body) => {
  return post(`${ENDPOINTURL}/role/list`, body);
};
export const rightsHandler = (body) => {
  return post(`${ENDPOINTURL}/rights`, body);
};

///RIGHTS
export const rightsHandlerData = (body) => {
  return post(`${ENDPOINTURL}/rights/list`, body);
};
export const rightsupdateHandlerData = (cid, body) => {
  return put(`${ENDPOINTURL}/rights/${cid}`, body);
};
// role apis
export const roleHandlerData = (body) => {
  return post(`${ENDPOINTURL}/role/list`, body);
};

export const addRoleHandlerData = (body) => {
  return post(`${ENDPOINTURL}/role/`, body);
};
export const updateRoleHandlerData = (id, body) => {
  return put(`${ENDPOINTURL}/role/${id}`, body);
};

export const searchRoleData = (body) => {
  return post(`${ENDPOINTURL}/role/search`, body);
};

// menu
export const menuHandlerData = (body) => {
  return post(`${ENDPOINTURL}/Menu/list`, body);
};
export const updateMenuHandlerData = (id, body) => {
  return put(`${ENDPOINTURL}/menu/${id}`, body);
};

// staff
export const staffHandlerData = (body) => {
  return post(`${ENDPOINTURL}/adminUser/list`, body);
};

export const addingStaffData = (body) => {
  return post(`${ENDPOINTURL}/adminUser/signup`, body);
};

export const updateStaffHandlerData = (id, body) => {
  return put(`${ENDPOINTURL}/adminUser/${id}`, body);
};
export const staffDataHandler = (body) => {
  return post(`${ENDPOINTURL}/adminUser/list`, body);
};

export const getRoutesData = (body) => {
  return post(`${ENDPOINTURL}/rights/list`, body);
};

// pwd update user
export const passwordUpdation = (id, body) => {
  return post(`${ENDPOINTURL}/adminUser/updatepassword/${id}`, body);
};
export const dashboardDataHandler = (body) => {
  return post(`${ENDPOINTURL}/dashboard/data`, body);
};
