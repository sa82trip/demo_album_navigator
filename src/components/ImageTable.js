import React from "react";
import { PROPERTIES } from "../constants/constants";

const ImageTable = ({ images, menuButtons, setEditTarget }) => {
  return (
    <div id="image_table" className="mx-3">
      {images &&
        images.map((one) => (
          <div key={one.id} className="container flex">
            <div className="mr-1 py-1">
              <span className="roundId">
                {one.id.length >= 3 ? one.id.split("-")[0] : one.id}
              </span>
            </div>
            <div key={one.id} className="ml-1 my-1 max-w-max">
              <div className="flex justify-between ">
                <label className="text-lg font-semibold">{one.title}</label>
                {one.userId === localStorage.getItem(PROPERTIES.USERID) ? (
                  <span
                    onClick={() => {
                      menuButtons.current.classList.remove("inset-full");
                      menuButtons.current.classList.add("inset-y-93");
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
