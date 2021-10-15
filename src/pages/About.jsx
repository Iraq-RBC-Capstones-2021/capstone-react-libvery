import { motion } from "framer-motion";
import React from "react";
import TeamCard from "../components/TeamCard";
import teamMembers from "../service/about.json";

function About() {
  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        transition: { duration: 1, type: "spring", stiffness: 100 },
        x: 0,
      }}
      className="bg-primary font-sans overflow-x-hidden"
    >
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
      <div className="text-center mx-10 sm:mx-32 lg:mx-52 mt-10">
        <h1 className="text-2xl font-semibold mb-3">Our Team</h1>
        {teamMembers.map(
          ({ name, image, position, description, reversed, social_links }) => {
            return (
              <TeamCard
                key={name}
                name={name}
                image={image}
                description={description}
                position={position}
                reversed={reversed}
                github={social_links.github}
                facebook={social_links.facebook}
              />
            );
          }
        )}
      </div>
    </motion.div>
  );
}

export default About;
