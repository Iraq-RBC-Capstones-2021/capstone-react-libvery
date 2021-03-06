import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "../components/BookCard";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import AddBookModal from "../components/AddBookModal";
import AnimateButton from "../customs/AnimateButton";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/pagination/Pagination";
import { changeDropdown } from "../store/dropdownSlice";
import { useTranslation } from "react-i18next";
import { fetchBooks } from "../store/books/booksSlice";
import { selectorUser } from "../store/users/userSlice";

function Books() {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const user = useSelector(selectorUser);
  const books = useSelector((state) => state.books.books);
  const dropVal = useSelector((state) => state.dropdown.dropdown);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(books);

  const [postsPerPage] = useState(8);

  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(books.length / postsPerPage);

  const Genres = [
    { value: "action", label: `${t("action")}` },
    { value: "novel", label: `${t("novel")}` },
    { value: "fiction", label: `${t("fiction")}` },
    { value: "adventure", label: `${t("adventure")}` },
    { value: "drama", label: `${t("drama")}` },
    { value: "comedy", label: `${t("comedy")}` },
    { value: "horror", label: `${t("horror")}` },
    { value: "romance", label: `${t("romance")}` },
  ];

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

  const optionsArr = Genres.map((genre, index) => {
    return (
      <option key={index} value={genre.value}>
        {genre.label}
      </option>
    );
  });

  function handleGenres(option, dropdownVal, searchVal) {
    if (option === dropdownVal) {
      // eslint-disable-next-line array-callback-return
      const data = books.filter((book) => {
        let genresArr = book.genres;
        let genresData = [];
        genresData = genresArr.map((newGenre) => [
          ...genresData,
          newGenre.label,
        ]);
        genresData = genresData.join().toLowerCase();

        if (genresData.includes(option.toLowerCase()) && searchVal === "") {
          return book;
        } else if (
          genresData.includes(option.toLowerCase()) &&
          book.bookTitle.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          return book;
        }
      });
      setPosts(data);
    }
  }

  function handleSearch(searchVal, dropVal, optionsArr) {
    if (dropVal === "All") {
      // eslint-disable-next-line array-callback-return
      const data1 = books.filter((book) => {
        if (searchVal === "") {
          return book;
        } else if (
          book.bookTitle.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          return book;
        }
      });

      setPosts([...data1]);
    } else if (dropVal === "Free") {
      // eslint-disable-next-line array-callback-return
      const data2 = books.filter((book) => {
        if (book.price === 0 && searchVal === "") {
          return book;
        }
        if (
          book.price === 0 &&
          book.bookTitle.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          return book;
        }
      });
      setPosts(data2);
    } else {
      const dropVal1 = dropVal;
      const searchVal1 = searchVal;
      // eslint-disable-next-line array-callback-return
      optionsArr.map((op) => {
        handleGenres(op.props.value, dropVal1, searchVal1);
      });
    }
  }

  useEffect(() => {
    handleSearch(searchVal, dropVal, optionsArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, dropVal, books]);

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
        <div
          className={`flex justify-start items-center md:justify-center ${
            booksArr?.length === 0 && "mb-96"
          }`}
        >
          <div className="flex relative bg-white rounded m-2 py-0.5 focus focus-within:ring-2 focus-within:ring-black shadow appearance-none">
            <AiOutlineSearch className="absolute left-1 mt-3 " />
            <input
              type="text"
              className="p-0 pl-1 ml-5 bg-transparent border-none focus:ring-transparent w-32 sm:w-60 "
              name="searchbar"
              id="searchbar"
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <p className="text-gray-400 text-2xl">|</p>
            <select
              className="p-0 px-1 w-28 h-10 ml-3 rounded-md focus:ring-transparent border-none"
              name="genres"
              value={dropVal}
              id="genres"
              onChange={(e) => dispatch(changeDropdown(e.target.value))}
            >
              <option value="All">{t("all")}</option>
              {optionsArr}
              <option value="Free">{t("free")}</option>
            </select>
          </div>
          {user.userName && (
            <>
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
            </>
          )}
        </div>
        <div className="grid sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:ml-28 md:mr-28 md:justify-center py-5">
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

export default Books;
