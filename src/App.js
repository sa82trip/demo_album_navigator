import { useEffect, useState } from "react";
import ImageTable from "./components/ImageTable";
import ImageUploader from "./components/ImageUploader";
import Pagination from "./components/Pagination";
import { COLORS } from "./constant/colors";
import { Login } from "./pages/login";
import "./styles/styles.css";

// const url = `https://via.placeholder.com/1024x250/${
//   COLORS[Math.round(Math.random() * 10 - 5)]
// }?text=${one.title}`;
function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(5);
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    console.log("currentImages");
    return images.slice(indexOfFirst, indexOfLast).map((one) => {
      console.log(one);
      const url = `https://via.placeholder.com/1024x250/${
        COLORS[Math.round(Math.random() * 10 - 5)]
      }?text=${one.title}`;
      return {
        id: one.id,
        userId: one.userId,
        title: one.title,
        imageUrl: one.id === 101 ? previewURL : url,
      };
    });
  };

  const handleFileOnChange = async (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    const newImages = Array.from(images);
    newImages.unshift({
      id: 101,
      title: "user uploaded photo",
      userId: 101,
    });
    await setImages(newImages);
  };
  if (localStorage.getItem("userId") !== "mock@test.com") {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-3">Hello Demo Album</h1>
      <div className="flex items-center justify-center">
        <div className="">
          <ImageTable images={currentImages()} />
          <div className="flex justify-center items-center mt-5">
            <div></div>
            <Pagination
              currentPage={currentPage}
              imagesPerPage={imagesPerPage}
              paginate={setCurrentPage}
              currentImages={currentImages}
              totalImages={images.length}
            />
            <div></div>
          </div>
        </div>
      </div>
      <ImageUploader
        previewURL={previewURL}
        handleFileOnChange={handleFileOnChange}
      />
    </>
  );
}

export default App;
