import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CreatePost from "./views/CreatePost/CreatePost";
import POST from "./components/Post/Post";
import Filter from "./components/Filter/Filter";
import EditPost from "./views/EditPost/EditPost";
import Alert from "./components/Alerts/Alert";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [category, setCategory] = useState([]);
  let categoryToPrint;

  const [createPost, setCreatePost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [printData, setPrintData] = useState(true);
  const [index, setIndex] = useState(0);
  const [postId, setPostId] = useState()
  const [showPostBtn, setShowPostBtn] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://us-central1-react-test-dd08f.cloudfunctions.net/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "test-id": "086754ee-01f4-11ec-9a03-0242ac130003",
          },
        }
      )
        .then((respose) => respose.json())
        .then((data) => {
          setFetchedPosts(data.message);
          setFetchedData(data.message);
        })
        .catch((error) => alert(error.message));
    }

    fetchPosts(setCategory);
  }, [printData]);

  console.log("post", fetchedPosts);
  console.log("data", fetchedData);

  useEffect(() => {
    async function fetchCatogeries() {
      const res = await fetch(
        "https://us-central1-react-test-dd08f.cloudfunctions.net/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "test-id": "086754ee-01f4-11ec-9a03-0242ac130003",
          },
        }
      )
        .then((response) => response.json().then((cats) => setCategory(cats)))
        .catch((error) => alert(error.message));
    }
    fetchCatogeries();
  }, []);

  const deletePost = async (index, id) => {
    console.log('id===>',id,'index==>',index)
    const res = await fetch(
      `https://us-central1-react-test-dd08f.cloudfunctions.net/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "test-id": "086754ee-01f4-11ec-9a03-0242ac130003",
        },
      }
    )
      .then((response) => {
        console.log(response);
        const currIndex = fetchedData.indexOf(fetchedData[index]);
        fetchedData.splice(currIndex, 1);
        setPrintData(!printData);
        setDeleteAlert(false);
      })
      .catch((error) => alert(error.message));
  };

  const filter = (e) => {
    let result,
      filteredCategory = e.target.value;
    for (let i = 0; i < fetchedPosts.length; i++) {
      result = fetchedPosts.filter((data) => data.category == filteredCategory);
    }
    if (!result) {
      alert("There isn't post");
    } else if (result.length > 0) {
      setShowPostBtn(true);
      setFetchedData(result);
      console.log("fetchedPosts", fetchedData);
    } else {
      setFetchedData(fetchedPosts);
    }
  };
  const showData = () => {
    setFetchedData(fetchedPosts);
    console.log("fetchedData", fetchedData);
    console.log("fetchedPosts", fetchedPosts);
    setShowPostBtn(false);
  };

  return (
    <div className="App">
      <Header createPost={createPost} setCreatePost={setCreatePost} />
      {createPost && (
        <CreatePost
          fetchedData={fetchedData}
          setCreatePost={setCreatePost}
          categories={category}
        />
      )}

      {!createPost && (
        <div className="bodyContent">
          <Filter
            categories={category}
            showPostBtn={showPostBtn}
            setShowPostBtn={setShowPostBtn}
            filter={filter}
            showData={showData}
          />

          <div className="postContent">
            {fetchedData
              .sort((a, b) => {
                if(!a.sort_order){
                  a.sort_order = 3
                }
                  return a.sort_order - b.sort_order
                
                })
              .map((post, currIndex) => {
                for (let i = 0; i < category.length; i++) {
                  if (post.category == category[i].id) {
                    categoryToPrint = category[i].value;
                  }
                }
                return (
                  <POST
                    index={currIndex}
                    setIndex={setIndex}
                    setPostId={setPostId}
                    key={Math.random()}
                    category={categoryToPrint}
                    postDetails={post}
                    setEditPost={setEditPost}
                    setIndex={setIndex}
                    deleteAlert={deleteAlert}
                    setDeleteAlert={setDeleteAlert}
                    deletePost={deletePost}
                  />
                );
              })}
          </div>
        </div>
      )}

      {editPost && (
        <>
          <div className="beforeEditDiv"></div>
          <EditPost
            setPrintData={setPrintData}
            printData = {printData}
            index={index}
            postDetails={fetchedData}
            currCategory={category}
            setEditPost={setEditPost}
          />
        </>
      )}
      {deleteAlert && (
        <Alert
          message="Are you sure you want to delete his post?"
          funcBtn1={() => {
            setDeleteAlert(false);
          }}
          funcBtn2={() => {
            deletePost(index, postId);
          }}
          btn1Text="Cancel"
          btn2Text="Delete"
          bg="alertBtn"
        />
      )}
    </div>
  );
}

export default App;
