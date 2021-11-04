import { motion } from "framer-motion";
import React, { useState } from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/pagination/Pagination";
import { selectorUser } from "../store/users/userSlice.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Favourites() {
  const user = useSelector(selectorUser);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.favorites?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(user.favorites?.length / postsPerPage);

  const booksArr = currentPosts.map((book) => (
    <div key={book.id} className="m-2">
      <BookCard
        id={book.id}
        title={book.bookTitle}
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
          {user.favorites.length === 0
            ? `😃 ${t("no_favorite_books_here")} `
            : `${t("your_Favorite_Books_Are_Here")}`}
        </h1>
        <div className="grid sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:justify-center py-5">
          {booksArr}
        </div>
      </div>
      <Pagination
        pages={howManyPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </motion.div>
  );
}

export default Favourites;
