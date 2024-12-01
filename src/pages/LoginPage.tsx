import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { loginValidatorSchema } from "../helper/validator";
import { loginApi } from "../redux/api/authApi";
import Loader from "../components/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidatorSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await loginApi(values);
        const { result } = res;
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
        navigate("/");
      } catch (err) {
        alert("Unauthorised user");
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-login-gradient flex w-full h-screen justify-center items-center">
      <form
        className="bg-slate-200 p-2 flex items-center flex-col gap-y-3 rounded-md justify-center lg:w-[30%] lg:h-[40%] md:w-full md:h-full"
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <h1 className="text-xl font-semibold">Login</h1>

        <CustomInput
          name="username"
          placeHolder="Username"
          setValue={formik.setFieldValue}
          value={formik.values.username}
          Icon={<FaEnvelope className="text-gray-400 mr-2" />}
          isPassword={false}
          onBlur={() => formik.setFieldTouched("username", true)}
        />
        {formik.errors.username && formik.touched.username && (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        )}

        <CustomInput
          name="password"
          placeHolder="Password"
          setValue={formik.setFieldValue}
          value={formik.values.password}
          Icon={<FaLock className="text-gray-400 mr-2" />}
          isPassword={true}
          onBlur={() => formik.setFieldTouched("password", true)}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        <button
          type="submit"
          className="bg-login-gradient p-2 text-white rounded-lg mt-3 flex flex-row items-center justify-center gap-x-2"
        >
          Login {Loading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
