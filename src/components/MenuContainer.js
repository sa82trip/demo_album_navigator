import React from "react";
import { useHistory } from "react-router-dom";

export default function MenuContainer({
  menuModal,
  deleteHandler,
  editTarget,
}) {
  const history = useHistory();
  return (
    <div
      ref={menuModal}
      className="z-40 text-2xl rounded-lg inset-full fixed transition-all duration-500 bg-gray-800 text-black w-full h-full m-0 p-0"
    >
      <div className="flex justify-center items-stretch">
        <button
          onClick={() => {
            menuModal.current.classList.add("inset-full");
            menuModal.current.classList.remove("top-96");
            deleteHandler(editTarget);
          }}
          className="bg-red-300 h-1/6 flex-grow"
        >
          Delete
        </button>
        <button
          className="bg-blue-300 h-1/6 text-center align-middle flex-grow"
          onClick={() => history.push(`/edit/${editTarget.id}`)}
        >
          Edit
        </button>
        <button
          onClick={() => {
            menuModal.current.classList.remove("inset-y-96");
            menuModal.current.classList.add("inset-full");
          }}
          className="bg-green-400 h-1/6 flex-grow"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
