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
