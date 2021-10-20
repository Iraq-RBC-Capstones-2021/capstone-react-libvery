import React, { useState, useEffect } from "react";
import "./pagination.css";

function Pagination({ pages = 10, currentPage, setCurrentPage }) {
  const numberOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [currentButton, setCurrentButton] = useState(1);

  const handleNextbtn = () => {
    setCurrentButton((prev) =>
      prev === numberOfPages.length ? prev : prev + 1
    );
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentButton((prev) => (prev === 1 ? prev : prev - 1));
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (numberOfPages.length > maxPageNumberLimit) {
    pageIncrementBtn = <span onClick={handleNextbtn}> &hellip; </span>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <span onClick={handlePrevbtn}> &hellip; </span>;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(currentButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton]);

  return (
    <div>
      <div className="pagination-container mb-5">
        <span>
          <button
            className={currentButton === 1 ? "disabled" : ""}
            onClick={handlePrevbtn}
            disabled={currentPage === numberOfPages[0] ? true : false}
          >
            Prev
          </button>
        </span>
        {pageDecrementBtn}
        {numberOfPages.map((page, index) => {
          if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
            return (
              <span
                onClick={() => setCurrentButton(page)}
                key={index}
                className={currentButton === page ? "active" : ""}
              >
                {page}
              </span>
            );
          } else {
            return null;
          }
        })}
        {pageIncrementBtn}
        <span>
          <button
            className={currentButton === numberOfPages.length ? "disabled" : ""}
            onClick={handleNextbtn}
          >
            Next
          </button>
        </span>
      </div>
    </div>
  );
}

export default Pagination;
