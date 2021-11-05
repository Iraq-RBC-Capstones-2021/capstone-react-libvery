import React from "react";
import projectLogo from "../assets/projectLogo.svg";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import { selectorUser } from "../store/users/userSlice";
import { useSelector } from "react-redux";

import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
} from "../routes";
import Languages from "./Languages";

function Footer() {
  const userName = useSelector(selectorUser).userName;

  const { t } = useTranslation();
  return (
    <footer>
      <div className="p-10 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-40 ">
            <div className="mb-5 flex flex-col justify-around items-center">
              <img
                className="mb-11 lg:self-start xl:ml-5"
                src={projectLogo}
                alt="checkmark"
              />
              <div className="flex flex-col justify-center items-center md:items-start md:text-left">
                <p className="font-bold text-lg md:self-center lg:self-start">
                  {t("contact_us")}
                </p>
                <p>{t("email")}: example@example.com</p>
                <p>{t("phone_number")}: 0770 000 00 00</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center mt-2">
                <Link
                  to={HOME_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  {t("home")}
                </Link>
                <Link
                  to={ABOUT_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  {t("about")}
                </Link>
                <Link
                  to={BOOKS_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  {t("books")}
                </Link>
                {userName ? (
                  <Link
                    to={FAVOURITES_ROUTE}
                    className="mx-5 hover:text-secondary transform hover:scale-105"
                  >
                    {t("favourites")}
                  </Link>
                ) : null}
              </div>
              <div className="flex flex-col justify-end items-center mt-10 md:mt-16 mb-5">
                <p className=" pb-1 md:mr-24 ">{t("never_miss_an_update")}</p>

                <div className="flex items-center md:mr-2">
                  <input
                    type="text"
                    className="w-52 h-7 pl-1"
                    name="newsletter"
                    id="newsletter"
                    placeholder={t("subscribe_to_our_newsletter")}
                  />
                  <button className="bg-blue-500 w-8 h-7 border-8 border-solid border-blue-500 flex justify-center items-center">
                    <GiCheckMark color="white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-5 md:col-span-2 lg:col-span-1 flex flex-col">
              <div className="flex justify-around  mb-5 mt-2 lg:mb-6">
                <a href="/facebook" target="_blank">
                  <FaFacebook size="1.7rem" />
                </a>
                <a href="/instagram" target="_blank">
                  <FaInstagram size="1.7rem" />
                </a>
                <a href="/twitter" target="_blank">
                  <FaTwitter size="1.7rem" />
                </a>
                <a href="/github" target="_blank">
                  <FaGithub size="1.7rem" />
                </a>
              </div>
              <Languages />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
