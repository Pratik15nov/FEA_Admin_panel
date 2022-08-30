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
