import React from "react";
import i18next from "i18next";
import cookie from "js-cookie";

const Languages = () => {
  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "ku",
      name: "کوردی",
      dir: "rtl",
    },
    {
      code: "ar",
      name: "العربية",
      dir: "rtl",
    },
  ];

  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lan) => lan.code === currentLanguageCode
  );

  return (
    <select
      className="my-5 outline-none rounded-sm lg:mt-16 self-center"
      onChange={(e) => i18next.changeLanguage(e.target.value)}
      value={currentLanguage.code}
    >
      {languages.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Languages;
