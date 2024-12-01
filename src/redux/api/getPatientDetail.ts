import axios from "axios";
import { url } from "../../constants/config";

export const getTruplan = (patientId: number | string) =>
  axios
    .get(`${url}/mobile/truplan/patients/${patientId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data);

export const uploadTruPlan = (patientId: number | string) =>
  axios
    .post(
      `${url}/mobile/truplan/patients/${patientId}`,
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
