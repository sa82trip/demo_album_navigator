import { useEffect, useState } from "react";
import ImageTable from "./components/ImageTable";

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums").then((response) => {
      if (response.ok) {
        response.json().then((data) => setImages(data));
      }
    });
  }, []);
  return (
    <>
      <h1>Hello Demo Album</h1>
      <ImageTable images={images} />
    </>
  );
}

export default App;
