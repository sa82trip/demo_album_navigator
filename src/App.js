import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import ImageTable from "./components/ImageTable";
import ImageUploader from "./components/ImageUploader";
import MenuContainer from "./components/MenuContainer";
import { NavBar } from "./components/NavBar";
import Pagination from "./components/Pagination";
import PostingEditor from "./components/PostingEditor";
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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const history = useHistory();
  const menuButtons = useRef();

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
        imageUrl: one.imageUrl && one.imageUrl.length > 0 ? one.imageUrl : url,
      };
    });
  };

  const handleFileOnChange = (event) => {
    let editingTarget;
    event.preventDefault();
    let reader = new FileReader();
    const files = Array.from(event.target.files);
    let file = files.pop();
    //여기서 분기 처리 해서 edit랑 post랑 구별
    const newImage = {
      id: `R-${new Date().valueOf()}`,
      title: `${localStorage.getItem("userId")} uploaded this photo`,
      userId: localStorage.getItem("userId"),
      imageUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (event.target.name === "editing") {
      editingTarget = images.find((one) => one.id == event.target.id);
    }
    reader.onload = () => {
      setFile(file);
      setPreviewURL(reader.result);
      if (event.target.name === "editing") {
        editingTarget.imageUrl = reader.result;
        editingTarget.updatedAt = new Date();
      } else {
        newImage.imageUrl = reader.result;
      }
    };
    reader.readAsDataURL(file);
    if (event.target.name === "editing") {
      setOnePost(editingTarget);
    } else {
      setOnePost(newImage);
    }
  };

  const postingHandler = () => {
    if (onePost) {
      const newImages = Array.from(images);
      newImages.unshift(onePost);
      setImages(newImages);
      setPreviewURL("");
    } else {
    }
  };

  const editHandler = () => {
    let newList = images.filter((one) => !one.createdAt);
    let onlyWithDate = images.filter((one) => one.createdAt);
    //data를 처음에 date가 없는 걸 받았기 때문에, 새로 업로드 하는 포스팅이랑 따로 작업
    if (onePost.createdAt) {
      if (onlyWithDate) {
        if (onlyWithDate.length == 1) {
          onlyWithDate[0] = onePost;
          setImages([...onlyWithDate, ...newList]);
          setPreviewURL("");
        } else if (onlyWithDate.length > 1) {
          onlyWithDate.filter((one) => one.id !== onePost.id).push(onePost);
          onlyWithDate.sort((a, b) => a.createdAt - b.createdAt);
          setImages([...onlyWithDate, ...newList]);
          setPreviewURL("");
        }
      }
    } else {
      newList.filter((one) => one.id !== onePost.id).push(onePost);
      newList.sort((a, b) => a.id - b.id);
      setImages(onlyWithDate ? [...onlyWithDate, ...newList] : newList);
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

  const deleteHandler = (target) => {
    setImages(images.filter((one) => one.id !== target.id));
  };

  if (localStorage.getItem("userId") !== "mock@test.com") {
    return (
      <Login setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} />
    );
  }

  return (
    <Router>
      <>
        <NavBar logoutHandler={logoutHandler} />
        <Switch>
          <Route exact path="/">
            <div className="hidden absolute z-50 top-0 left-0 w-full h-full"></div>
            <div className="flex items-center justify-center">
              <div className="">
                <ImageTable
                  deleteHandler={deleteHandler}
                  images={currentImages()}
                  menuButtons={menuButtons}
                  setEditTarget={setEditTarget}
                  editTarget={editTarget}
                />
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
            <MenuContainer
              menuModal={menuButtons}
              editTarget={editTarget}
              deleteHandler={deleteHandler}
            />
          </Route>
          <Route exact path="/upload">
            <ImageUploader
              postingHandler={postingHandler}
              previewURL={previewURL}
              handleFileOnChange={handleFileOnChange}
            />
          </Route>
          <Route exact path="/edit/:id">
            <PostingEditor
              previewURL={previewURL}
              images={images}
              handleFileOnChange={handleFileOnChange}
              editHandle={editHandler}
            />
          </Route>
        </Switch>
      </>
    </Router>
  );
}
export default App;
