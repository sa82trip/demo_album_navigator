import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import ImageTable from "./components/ImageTable";
import ImageUploader from "./components/ImageUploader";
import { NavBar } from "./components/NavBar";
import Pagination from "./components/Pagination";
import { COLORS } from "./constant/colors";
import { Login } from "./pages/login";
import "./styles/styles.css";

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(5);
  const [file, setFile] = useState("");
  const [onePost, setOnePost] = useState({});
  const [previewURL, setPreviewURL] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [location, setLocation] = useState("");

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
    return images.slice(indexOfFirst, indexOfLast).map((one) => {
      const url = `https://via.placeholder.com/1024x250/${
        COLORS[Math.round(Math.random() * 10 - 5)]
      }?text=${one.title}`;
      return {
        id: one.id,
        userId: one.userId,
        title: one.title,
        imageUrl: one.id === "R" ? one.imageUrl : url,
      };
    });
  };

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    const files = Array.from(event.target.files);
    let file = files.pop();
    console.log(file);
    const newImage = {
      id: "R",
      title: "user uploaded photo",
      userId: 101,
      imageUrl: "",
    };
    reader.onload = () => {
      setFile(file);
      setPreviewURL(reader.result);
      newImage.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
    setOnePost(newImage);
  };
  const postingHandler = () => {
    console.log("postingHandler");
    if (onePost) {
      const newImages = Array.from(images);
      newImages.unshift(onePost);
      setImages(newImages);
      setPreviewURL("");
    } else {
      console.log("no image");
    }
  };
  const logoutHandler = () => {
    const isConfirmed = window.confirm("Do you really want to logout?");
    if (isConfirmed) {
      localStorage.clear();
      history.push("/");
      history.go("/");
      setIsLoggedIn(false);
    }
  };
  if (localStorage.getItem("userId") !== "mock@test.com") {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <Router>
      <>
        <NavBar logoutHandler={logoutHandler} />
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route exact path="/upload">
            <ImageUploader
              postingHandler={postingHandler}
              previewURL={previewURL}
              handleFileOnChange={handleFileOnChange}
            />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
