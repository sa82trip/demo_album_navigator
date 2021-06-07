import React from "react";

const ImageTable = ({ images, menuButtons, setEditTarget }) => {
  return (
    <div id="image_table" className="mx-3">
      {images &&
        images.map((one) => (
          <div key={one.id} className="container flex">
            <div className="mr-1 py-1">
              <span className="text-2xl font-bold p-1 rounded-full bg-gray-500 text-white h-10 w-10 flex items-center justify-center">
                {one.id.length >= 3 ? one.id.split("-")[0] : one.id}
              </span>
            </div>
            <div key={one.id} className="ml-1 my-1 max-w-max">
              <div className="flex justify-between ">
                <label className="text-lg font-semibold">{one.title}</label>
                {one.userId === localStorage.getItem("userId") ? (
                  <span
                    onClick={() => {
                      menuButtons.current.classList.remove("inset-full");
                      menuButtons.current.classList.add("inset-y-96");
                      setEditTarget(one);
                    }}
                    className="text-lg"
                  >
                    …
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <img className="w-auto rounded-lg" src={one.imageUrl} />
            </div>
          </div>
        ))}
    </div>
  );
};
export default ImageTable;
