import { post, remove, patch, put } from "./Web.Request";
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



