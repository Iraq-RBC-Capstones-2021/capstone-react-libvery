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
      className={`sm:flex sm:items-center sm:justify-evenly md:ml-2 md:mr-2 lg:ml-52 lg:mr-52 ${
        reversed ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex justify-center items-center flex-col m-5">
        <img
          src={image || defaultImage}
          alt={name}
          className=" w-40 h-auto rounded-full"
        />
        <h3 className="text-xl font-medium m-2">
          {name} - {position}
        </h3>
        <div className="flex">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <VscGithubInverted size={25} className="mr-2" />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <BsFacebook size={25} className="" color="#3779ff" />
          </a>
        </div>
      </div>
      <p className="md:w-8/12 text-left text-lg">{description}</p>
    </div>
  );
}

export default TeamCard;
