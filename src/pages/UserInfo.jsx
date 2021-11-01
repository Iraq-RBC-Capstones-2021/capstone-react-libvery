import React, { useRef, useState } from "react";

import { selectorUser, setActiveUser } from "../store/counter/userSlice";
import { useSelector, useDispatch } from "react-redux";

import SignoutButton from "../components/SignoutButton";
import { updateUserProfile } from "../service/user";
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  const [showEditForm, setShowEditForm] = useState(false);

  const { t } = useTranslation();
  const usernameRef = useRef();
  const phoneRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector(selectorUser);

  const handleShowForm = () => {
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateUserProfile({ usernameRef, phoneRef, ...user });
    dispatch(
      setActiveUser({
        ...user,
        userName: usernameRef.current.value || user.userName,
        userPhone: phoneRef.current.value || user.userPhone,
      })
    );

    setShowEditForm(false);
  };

  return (
    <div className=" w-full max-w-sm md:max-w-sm m-auto">
      <form className="rounded px-0 pt-6 pb-8 " onSubmit={handleUpdate}>
        {showEditForm ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-2">
                {t("name")}
              </label>
              <input
                className="shadow appearance-none border-none rounded-lg  focus:outline-none outline-none w-full py-3 px-3 text-gray-500 font leading-tight  focus:shadow-outline font-extralight text-sm"
                type="text"
                placeholder={user.userName}
                ref={usernameRef}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font text-sm mb-2">
                {t("phone_number")}
              </label>
              <input
                className="  border-none w-full 	 shadow appearance-none border  rounded-lg  py-3 px-3 text-gray-500 font mb-3 leading-tight focus:outline-none focus:shadow-outline font-extralight text-sm"
                type="text"
                placeholder={user.userPhone}
                ref={phoneRef}
              />
            </div>
          </>
        ) : (
          <div className="space-y-3 mb-10 font-bold text-lg">
            <p>
              {t("name")}: {user.userName}{" "}
            </p>
            <p>
              {t("email")}: {user.userEmail}{" "}
            </p>
            <p>
              {t("phone_number")}:{" "}
              {user.userPhone
                ? user.userPhone
                : `${t("please_add_a_phone_number")}`}{" "}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center m-2 ">
          <button
            className="bg-black hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
            type="button"
            onClick={showEditForm ? handleUpdate : handleShowForm}
          >
            {showEditForm ? `${t("save_changes")}` : `${t("edit")}`}
          </button>
        </div>
        <div className="flex items-center justify-center ">
          <SignoutButton className=" bg-red-800  hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light" />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
