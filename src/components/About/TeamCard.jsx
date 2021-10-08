import React from "react";
import defaultImage from "../../assets/team.svg";
import teamMembers from "../../service/about.json";

function TeamCard() {
  const teamMember = teamMembers.map((member) => (
    <div
      className={`mb-10 sm:flex sm:items-center sm:justify-evenly ${
        member.reversed ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex justify-center items-center flex-col">
        <img
          src={member.image || defaultImage}
          alt={member.name}
          className="w-40"
        />
        <h3 className="text-xl font-medium mb-2">
          {member.name} - {member.position}
        </h3>
      </div>
      <p>{member.description}</p>
    </div>
  ));

  return <>{teamMember}</>;
}

export default TeamCard;
