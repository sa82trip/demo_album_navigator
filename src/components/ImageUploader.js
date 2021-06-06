import React from "react";
import { useHistory } from "react-router-dom";

const ImageUploader = ({ postingHandler, previewURL, handleFileOnChange }) => {
  const history = useHistory();
  return (
    <>
      <div id="image_upload" className="mx-1">
        <span>
          <input type="file" onChange={(e) => handleFileOnChange(e)}></input>
        </span>
        <img className="w-1/2 mt-2" src={previewURL} />
      </div>
      <div className="flex justify-between items-end">
        <div></div>
        <button
          onClick={() => {
            postingHandler();
            history.push("/");
          }}
          className="mx-3 p-2 bg-indigo-500 text-white font-semibold rounded-md"
        >
          confirm
        </button>
      </div>
    </>
  );
};
export default ImageUploader;
