import { motion } from "framer-motion";
import React, { useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/pagination/Pagination";
import booksData from "../service/fakeData.json";

function Favourites() {
  const [posts] = useState([...booksData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(posts.length / postsPerPage);

  const booksArr = currentPosts.map((book) => (
    <div key={book.id} className="m-2">
      <BookCard
        id={book.id}
        title={book.title}
        genres={book.genres}
        image={book.image}
        rating={book.rating}
        price={book.price}
      />
    </div>
  ));

  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        transition: { duration: 1, type: "spring", stiffness: 100 },
        x: 0,
      }}
    >
      <div className="flex flex-col ">
        <h1 className="p-3 mt-3 shadow appearance-none font-sans font-semibold text-gray-800 self-center tracking-wide text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Your Favorite Books Are Here
        </h1>
        <div className="grid sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:justify-center py-5">
          {booksArr}
        </div>
      </div>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </motion.div>
  );
}

export default Favourites;
