import React from "react";

const Pagination = ({ imagesPerPage, totalImages, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pb-10 ml-5">
      <ul className="flex flex-wrap">
        {pageNumbers.map((number) => (
          <li className="mx-1">
            <span
              onClick={() => paginate(number)}
              className="font-semibold text-blue-500 cursor-pointer"
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
