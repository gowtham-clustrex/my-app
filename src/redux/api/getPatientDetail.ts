import axios from "axios";
import { url } from "../../constants/config";
// import { url } from "../const/config";

export const getTruplan = (case_id: number | string) =>
  axios
    .get(`${url}/mobile/truplan/case-details/${case_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data);

export const uploadTruPlan = (case_id: number | string) =>
  axios
    .post(
      `${url}/mobile/truplan/case-details/${case_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => res.data);

export const getPatientDicom = (case_id: number | string | null) =>
  axios
    .get(`${url}/mobile/case-details/${case_id}/anatomy`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data);
