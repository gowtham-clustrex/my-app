import * as Yup from "yup";

export const loginValidatorSchema = Yup.object({
  username: Yup.string().required("username  is required"),
  password: Yup.string()
    .min(2, "Password must be at least 2 characters")
    .required("Password is required"),
});
