import React from "react";
import { useHistory } from "react-router-dom";

const ImageUploader = ({ postingHandler, previewURL, handleFileOnChange }) => {
  const history = useHistory();
  return (
    <>
      <div id="image_upload" className="mx-1">
        <span>
          <input
            name="posting"
            type="file"
            onChange={(e) => handleFileOnChange(e)}
          ></input>
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
          className="confirmBtn"
        >
          confirm
        </button>
      </div>
    </>
  );
};
export default ImageUploader;
