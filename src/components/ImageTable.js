import React from "react";
import { COLORS } from "../constant/colors";

const ImageTable = ({ images }) => {
  return (
    <div>
      <h2>Image from paceholder.com</h2>
      {images &&
        images.map((one) => (
          <div className="my-1 max-w-max">
            <img
              src={`https://via.placeholder.com/1024x60/${
                COLORS[Math.round(Math.random() * 10 - 5)]
              }?text=${one.title}`}
            />
          </div>
        ))}
    </div>
  );
};
export default ImageTable;
