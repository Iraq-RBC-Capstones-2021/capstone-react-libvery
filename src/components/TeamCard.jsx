import React from "react";
import defaultImage from "../assets/team.svg";
import { VscGithubInverted } from "react-icons/vsc";
import { BsFacebook } from "react-icons/bs";

function TeamCard({
  image,
  name,
  description,
  position,
  reversed,
  github,
  facebook,
}) {
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
        <div className="flex mb-2">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <VscGithubInverted size={25} className="mr-2" />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <BsFacebook size={25} className="" color="#3779ff" />
          </a>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default TeamCard;
