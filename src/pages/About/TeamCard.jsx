import React from "react";
import defaultImage from "../../assets/team.svg";

function TeamCard({ image, name, description, position, reversed }) {
  return (
    <div
      className={`mb-10 sm:flex sm:items-center sm:justify-evenly ${
        reversed ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex justify-center items-center flex-col">
        <img src={image || defaultImage} alt={name} className="w-40" />
        <h3 className="text-xl font-medium mb-2">
          {name} - {position}
        </h3>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default TeamCard;
