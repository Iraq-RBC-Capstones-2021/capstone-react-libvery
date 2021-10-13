import React from "react";
import i18next from "i18next";

const Languages = () => {
  return (
    <select
      className="my-5 outline-none rounded-sm lg:mt-16 self-center"
      id="lang-dropdown"
      onChange={(e) => i18next.changeLanguage(e.target.value)}
    >
      <option value="ar">🇸🇦 العربية</option>
      <option value="en">🇬🇧 English</option>
      <option value="kurd">🇮🇶 Kurdish</option>
    </select>
  );
};

export default Languages;
