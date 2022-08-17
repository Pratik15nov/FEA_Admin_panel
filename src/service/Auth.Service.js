import  {  post } from "./Web.Request"
import { ENDPOINTURL } from '../utils/Helper';

export const categoryHandlerData = (body) => {
    return post(`${ENDPOINTURL}/category/list`, body);
  };