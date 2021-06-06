import React from "react";

const ImageUploader = ({ previewURL, handleFileOnChange }) => {
  return (
    <div id="image_upload" className="mx-1">
      <span>
        <input type="file" onChange={(e) => handleFileOnChange(e)}></input>
      </span>
      <img className="w-1/2" src={previewURL} />
    </div>
  );
};
export default ImageUploader;
