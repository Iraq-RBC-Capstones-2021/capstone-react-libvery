import React from "react";
import i18next from "i18next";

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

  return (
    <select
      className="my-5 outline-none rounded-sm lg:mt-16 self-center"
      id="lang-dropdown"
      onChange={(e) => i18next.changeLanguage(e.target.value)}
    >
      {languages.map(({ code, name, dir }) => (
        <option key={code} value={code} dir={dir}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Languages;
