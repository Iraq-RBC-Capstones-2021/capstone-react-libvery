import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SIGNIN_ROUTE } from "../routes";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { signUp } from "../store/counter/userSlice";

import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

import Email from "../assets/Email.svg";
import Key from "../assets/Key.svg";
import User from "../assets/User.svg";
import formPhone from "../assets/formPhone.svg";
import Phone from "../assets/Phone.svg";

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  userPhone: Yup.string()
    .required("Phone number is required.")
    .matches(/07[3-9][0-9]{8}/, "Invalid Phone Number"),
});

const SignUp = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const onFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    setFileUrl(await getDownloadURL(storageRef));
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      userPhone: "",
      userPhoto: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 10));
      setLoading(true);
      dispatch(signUp({ values, fileUrl }));
      history.push("/profile");
      setLoading(false);
    },
  });

  if (loading)
    return (
      <p className="text-center m-24 text-5xl font-extrabold">Loading ...</p>
    );

  return (
    <div className="min-h-screen flex  items-center md:space-x-44  justify-center flex-wrap  bg-primary font-sans ">
      <div className="bg-white m-5 p-10 md:p-16 rounded-xl shadow-2xl md:w-6/12 lg:w-5/12 ">
        <h1 className="md:text-3xl  font-bold font-sans	 mb-10 text-black">
          {t("sign_up")} 📚
        </h1>

        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={User}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />

            <input
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              className={`w-full border-1 
              ${
                formik.errors.userName ? `border-red-700` : `border-gray-200`
              } p-3 rounded outline-none focus:border-black placeholder-gray-400
              form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
              `}
              placeholder={t("username")}
            />
          </div>
          {formik.touched.userName ? (
            <p className="text-xs text-red-700  ">{formik.errors.userName}</p>
          ) : null}

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Email}
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />

            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              className={`w-full border-1 
                    ${
                      formik.errors.email ? `border-red-700` : `border-gray-200`
                    } p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    `}
              placeholder={t("email")}
            />
          </div>
          {formik.touched.email ? (
            <p className="text-xs text-red-700  ">{formik.errors.email}</p>
          ) : null}

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Key}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              className={`w-full border-1 
              ${
                formik.errors.password ? `border-red-700` : `border-gray-200`
              } p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    `}
              placeholder={t("password")}
            />
          </div>
          {formik.touched.password ? (
            <p className="text-xs text-red-700  ">{formik.errors.password}</p>
          ) : null}

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Key}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              type="password"
              name="passwordConfirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              className={`w-full border-1 
              ${
                formik.errors.passwordConfirm
                  ? `border-red-700`
                  : `border-gray-200`
              } p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    `}
              placeholder={t("password")}
            />
          </div>
          {formik.touched.passwordConfirm ? (
            <p className="text-xs text-red-700  ">
              {formik.errors.passwordConfirm}
            </p>
          ) : null}

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={formPhone}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              type="tel"
              name="userPhone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userPhone}
              className={`w-full border-1 
              ${
                formik.errors.userPhone ? `border-red-700` : `border-gray-200`
              } p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    `}
              placeholder={t("phone number")}
            />
          </div>
          {formik.touched.userPhone ? (
            <p className="text-xs text-red-700  ">{formik.errors.userPhone}</p>
          ) : null}

          <label className="w-60 text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center">
            <span>Upload photo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <input
              type="file"
              name="userPhoto"
              onChange={onFileChange}
              onBlur={formik.handleBlur}
              className="hidden"
            />
          </label>

          <div className="flex items-center pb-5 text-gray-800  font-light text-sm">
            <input
              className="text-secondary w-5 h-5 mr-2 focus:ring-secondary 
                    focus:ring-opacity-25  border-gray-300 rounded-2xl"
              type="checkbox"
              id="agree"
            />
            {t("terms_and_conditions")}
          </div>

          <button
            type="submit"
            className="block w-full bg-secondary p-4 rounded text-white font-bold	 hover:text-black transition duration-300"
          >
            {t("sign_up_button")}
          </button>
          <div className="flex items-center  text-gray-800  font-light text-sm">
            {t("already_have_an_account")}?
            <span className="pl-2  font-bold">
              <Link to={SIGNIN_ROUTE}> {t("sign_in")}</Link>
            </span>
          </div>
        </form>
      </div>
      <div>
        <img src={Phone} className="m-2" alt="" />
      </div>
    </div>
  );
};

export default SignUp;
