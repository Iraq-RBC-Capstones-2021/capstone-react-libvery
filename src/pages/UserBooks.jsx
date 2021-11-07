import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "../components/BookCard";
import { FiPlusCircle } from "react-icons/fi";
import AddBookModal from "../components/AddBookModal";
import AnimateButton from "../customs/AnimateButton";
import { useSelector } from "react-redux";
import Pagination from "../components/pagination/Pagination";
import { selectorUser } from "../store/users/userSlice";
import { fetchUserBooks } from "../store/books/booksSlice";
import { useDispatch } from "react-redux";
function UserBooks() {
  const user = useSelector(selectorUser);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchUserBooks(user.uid));
  }, [dispatch, user.uid, books]);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(books.length / postsPerPage);

  const booksArr = currentPosts.map((book) => (
    <div key={book.id} className="m-2">
      <BookCard
        user_uid={user.uid}
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
    <>
      <motion.div
        exit={{ opacity: 0, x: 100 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: 1,
          transition: { duration: 1, type: "spring", stiffness: 100 },
          x: 0,
        }}
      >
        <div className="flex  items-center justify-center">
          <AnimateButton
            OnClickContact={() => setIsAddBookModalOpen(true)}
            classStyle="bg-secondary text-white rounded-full px-1 py-1"
          >
            <FiPlusCircle
              onClick={() => setIsAddBookModalOpen(true)}
              size={27}
            />
          </AnimateButton>
          <AddBookModal
            isAddBookModalOpen={isAddBookModalOpen}
            setIsAddBookModalOpen={setIsAddBookModalOpen}
          />
        </div>
        <div className=" grid sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:ml-28 md:mr-28 md:justify-center py-5">
          {booksArr}
        </div>
        <Pagination
          pages={howManyPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    </>
  );
}

export default UserBooks;
