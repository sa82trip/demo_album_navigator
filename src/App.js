import { useEffect, useState } from "react";
import ImageTable from "./components/ImageTable";
import Pagination from "./components/Pagination";
import "./styles/styles.css";

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums").then((response) => {
      if (response.ok) {
        response.json().then((data) => setImages(data));
      }
    });
  }, []);

  // 각 페이지에서 보여질 그림들의 처음과 끝
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;

  // 각페이지에 표시 될 그림들을 리턴하는 함수
  const currentImages = () => {
    return images.slice(indexOfFirst, indexOfLast);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Hello Demo Album</h1>
      <ImageTable images={currentImages()} />
      <Pagination
        imagesPerPage={imagesPerPage}
        paginate={setCurrentPage}
        totalImages={images.length}
      />
    </>
  );
}

export default App;
