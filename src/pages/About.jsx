import React from "react";
import TeamCard from "../components/TeamCard";
import teamMembers from "../service/about.json";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  return (
    <div className="bg-primary font-sans">
      <div className="text-center mx-10 sm:mx-32 lg:mx-96">
        <h1 className="text-2xl font-semibold mb-3">{t("our_story")}</h1>
        <p>{t("about_header")}</p>
      </div>
      <div className="text-center mx-10 sm:mx-32 lg:mx-52 mt-10">
        <h1 className="text-2xl font-semibold mb-3">{t("our_team")}</h1>
        {teamMembers.map(({ name, image, position, description }) => {
          return (
            <TeamCard
              key={name}
              name={name}
              image={image}
              description={description}
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
}

export default About;
