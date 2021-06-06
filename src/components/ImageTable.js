import React from "react";
import { COLORS } from "../constant/colors";

const ImageTable = ({ images }) => {
  console.log(images);
  return (
    <div id="image_table" className="mx-3">
      {images &&
        images.map((one) => (
          <div className="container flex">
            <div className="mr-1 py-1">
              <span className="text-2xl font-bold p-1 rounded-full bg-gray-800 text-white h-7 w-7 flex items-center justify-center">
                id
              </span>
            </div>
            <div key={one.id} className="ml-1 my-1 max-w-max">
              <label className="text-xs font-semibold">{one.title}</label>
              <img
                className="w-auto rounded-lg"
                src={`https://via.placeholder.com/1024x250/${
                  COLORS[Math.round(Math.random() * 10 - 5)]
                }?text=${one.title}`}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
export default ImageTable;
