import React from "react";

const ImageTable = ({ images }) => {
  return (
    <div>
      <h2>Image from paceholder.com</h2>
      {images &&
        images.map((one) => (
          <div key={one.id}>
            {one.id}. {one.title}
          </div>
        ))}
    </div>
  );
};
export default ImageTable;
