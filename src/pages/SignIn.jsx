import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SIGNUP_ROUTE } from "../routes";

import Email from "../assets/Email.svg";
import Key from "../assets/Key.svg";
import SigninIllustration from "../assets/SigninIllustration.svg";

import GoogleAuth from "../components/GoogleAuth";
import { signIn } from "../store/users/userSlice";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(signIn({ emailRef, passwordRef, setErrors, history }));
    setLoading(false);
  };
  if (loading) return <p>Loading ...</p>;
  return (
    <div className="min-h-screen flex  items-center justify-around flex-wrap  bg-primary font-sans ">
      <div className="bg-white m-2 p-10 md:p-16 rounded-xl md:w-6/12 lg:w-5/12 ">
        <h1 className="text-4xl font-bold font-sans	 mb-10 text-black">
          {t("sign_in")} 📚
        </h1>
        <form className="space-y-5" onSubmit={handleSignin}>
          <div className="relative">
            <img
              src={Email}
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />

            <input
              type="email"
              ref={emailRef}
              className="w-full border-1 
              border-gray-200 p-3 rounded outline-none  focus:border-black placeholder-gray-400
              form-input border  py-3 px-4  appearance-none  block pl-14 focus:outline-none
              "
              placeholder={t("email")}
            />
          </div>

          <div className="relative">
            <img
              src={Key}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              type={!showPassword ? "password" : "text"}
              ref={passwordRef}
              className="w-full border-1 
              border-gray-200 p-3 rounded outline-none focus:border-black placeholder-gray-400
              form-input border  py-3 px-4 bg-white   appearance-none  block pl-14 focus:outline-none
              "
              placeholder={t("password")}
            />
            <button
              className="cursor-pointer h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-6 font-light text-xs text-gray-600"
              onClick={handleShowPassword}
            >
              {!showPassword ? `${t("show")}` : `${t("hide")}`}
            </button>
          </div>
          {errors && (
            <p className=" text-red-600 w-full text-sm text-center">{errors}</p>
          )}

          <button
            type="submit"
            className="block w-full bg-secondary p-4 rounded text-white font-bold	 hover:text-black transition duration-300"
          >
            {t("sign_in_button")}
          </button>

          <div className="flex items-center  text-gray-800  font-light text-sm">
            {t("don't_have_an_account")}?
            <span className="pl-2  font-bold">
              <Link to={SIGNUP_ROUTE}> {t("sign_up")}! </Link>
            </span>
          </div>

          <p className="text-center text-gray-500 font-light">- {t("or")} -</p>

          <div className="flex items-center justify-center space-x-4 text-gray-800  ">
            <GoogleAuth />
          </div>
        </form>
      </div>
      <div>
        <img src={SigninIllustration} className="m-2 " alt="" />
      </div>
    </div>
  );
};

export default SignIn;
