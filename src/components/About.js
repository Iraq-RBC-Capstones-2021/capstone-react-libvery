import React from "react";
import teamImage from "./team.svg";

function About() {
  const teamMembers = [
    {
      name: "Muhanned",
      position: "Trainer",
      image: teamImage,
      description:
        "I'm a web developer and software engineer student. I have 1 year experience and I like Karate.",
    },
    {
      name: "Rawand",
      position: "Developer",
      image: teamImage,
      description:
        "I'm a web developer and software engineer student. I have 1 year experience and I like Karate.",
    },
    {
      name: "Niyaz",
      position: "Developer",
      image: teamImage,
      description:
        "I'm a web developer and software engineer student. I have 1 year experience and I like Karate.",
    },
    {
      name: "Zahra",
      position: "Developer",
      image: teamImage,
      description:
        "I'm a web developer and software engineer student. I have 1 year experience and I like Karate.",
    },
    {
      name: "Ahmed",
      position: "Developer",
      image: teamImage,
      description:
        "I'm a web developer and software engineer student. I have 1 year experience and I like Karate.",
    },
  ];

  const teamMember = teamMembers.map((member) => (
    <div className="mb-10">
      <div className="flex justify-center items-center flex-col">
        <img src={member.image} alt={member.name} className="w-40" />
        <h3 className="text-xl font-medium mb-2">
          {member.name} - {member.position}
        </h3>
      </div>
      <p>{member.description}</p>
    </div>
  ));

  return (
    <div className="bg-primary font-sans">
      <div className="text-center mx-10 sm:mx-32 lg:mx-96">
        <h1 className="text-2xl font-semibold mb-3">Our Story</h1>
        <p>
          We are a team of developers who love to create and build things. We
          built{" "}
          <span className="transition ease-linear font-semibold font-sans border-b-2 border-transparent hover:border-current cursor-pointer text-secondary">
            Libvery
          </span>{" "}
          to help you easily find the books you need. Our aim is to make life
          much more easier to access books and make a better generation.
        </p>
      </div>
      <div className="text-center mx-10 sm:mx-32 lg:mx-96 mt-10">
        <h1 className="text-2xl font-semibold mb-3">Our Team</h1>
        <div>{teamMember}</div>
      </div>
    </div>
  );
}

export default About;
