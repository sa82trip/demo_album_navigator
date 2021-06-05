import React, { useEffect, useState } from "react";

const ImageTable = (props) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(props.images);
    setImages(props.images);
  });
  return (
    <div>
      <h2>ImageTable</h2>
      {images && images.map((one) => <div key={one.id}>{one.title}</div>)}
    </div>
  );
};
export default ImageTable;
