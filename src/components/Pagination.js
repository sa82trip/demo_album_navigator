import React from "react";

const Pagination = ({ imagesPerPage, totalImages, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pb-10 ml-5">
      <div className="flex">
        {currentPage !== 1 ? (
          <div className="text-2xl">
            <span className="mx-1" onClick={() => paginate(pageNumbers[0])}>
              &#8606;
            </span>
            <span className="mx-1" onClick={() => paginate(currentPage - 1)}>
              &larr;
            </span>
          </div>
        ) : (
          <div>
            <span className="mx-1">&#160;</span>
            <span className="mx-1">&#160;</span>
          </div>
        )}
        <span className="text-2xl underline">{currentPage}</span>
        {currentPage === pageNumbers.length ? (
          <div>
            <span className="mx-1">&#160;</span>
            <span className="mx-1">&#160;</span>
          </div>
        ) : (
          <div className="text-2xl">
            <span className="mx-1" onClick={() => paginate(currentPage + 1)}>
              &rarr;
            </span>
            <span
              className="mx-1"
              onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
            >
              &#8608;
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Pagination;
