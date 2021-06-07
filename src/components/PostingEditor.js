import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function PostingEditor({
  previewURL,
  handleFileOnChange,
  images,
  editHandle,
}) {
  const history = useHistory();
  const params = useParams();
  const [target, setTarget] = useState({});
  useEffect(() => {
    editPost();
  }, []);
  const editPost = () => {
    const post = images.filter((one) => one.id == params.id)[0];
    setTarget(post);
  };
  return (
    <>
      <div id="image_upload" className="mx-1">
        <span>
          <input
            name="editing"
            id={target.id}
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
            editHandle();
            history.push("/");
          }}
          className="confirmBtn"
        >
          confirm
        </button>
      </div>
    </>
  );
}
