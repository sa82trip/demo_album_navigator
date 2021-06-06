import React from "react";

const ImageTable = ({ images }) => {
  console.log("images", images);
  return (
    <div id="image_table" className="mx-3">
      {images &&
        images.map((one) => (
          <div className="container flex">
            <div className="mr-1 py-1">
              <span className="text-2xl font-bold p-1 rounded-full bg-gray-500 text-white h-10 w-10 flex items-center justify-center">
                {one.id}
              </span>
            </div>
            <div key={one.id} className="ml-1 my-1 max-w-max">
              <label className="text-lg font-semibold">{one.title}</label>
              <img className="w-auto rounded-lg" src={one.imageUrl} />
            </div>
            <hr className="bg-white"></hr>
          </div>
        ))}
    </div>
  );
};
export default ImageTable;
