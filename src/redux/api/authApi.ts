import axios from "axios";
import { loginRequestDataType } from "../../types/loginTypes";
import { url } from "../../constants/config";

export const loginApi = (data: loginRequestDataType) =>
  axios.post(`${url}/login`, data).then((res) => res.data);
