import swal from "sweetalert";
import { useState } from "react";
import "./CreatePost.css";
import Alert from "../../components/Alerts/Alert";

export default function CreatePost({ fetchedData, categories, setCreatePost }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    sort_order: 3,
  });
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const postData = async (data) => {
    if (!formData.title) {
      setTitleError(true);
    } else if (!formData.description) {
      setDescriptionError(true);
    } else if (!formData.category) {
      setCategoryError(true);
    } else {
      fetchedData.push(data);
      await fetch(
        "https://us-central1-react-test-dd08f.cloudfunctions.net/posts",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "test-id": "086754ee-01f4-11ec-9a03-0242ac130003",
          },
          body: JSON.stringify(data),
        }
      )
        .then((data) => {
          console.log("post data", data);
          setShowSuccessAlert(true);
          setFormData({
            title: "",
            description: "",
            category: "",
            sort_order: '',
          });
        })
        .catch((e) => console.log("error", e.message));
    }
  };

  const changeHandler = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const submitHandler = (e) => e.preventDefault();

  return (
    <div className="createPostDiv">
      <form onSubmit={submitHandler}>
        <div className="formHeading">Create Post</div>

        <div className="fieldDivs">
          <p className="fieldHeadings">Title</p>
          <input
            maxLength="50"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
          {titleError && <p className="error">Please input title !</p>}
          <p className="fieldInstructions">(Maximum 50 characters)</p>
        </div>

        <div className="fieldDivs">
          <p className="fieldHeadings">Description</p>
          <textarea
            maxLength="150"
            className="descriptionInput"
            name="description"
            value={formData.description}
            onChange={changeHandler}
          ></textarea>
          {descriptionError && (
            <p className="error">Please add description !</p>
          )}
          <p className="fieldInstructions">(Maximum 150 characters)</p>
        </div>

        <div className="fieldDivs">
          <p className="fieldHeadings">Category</p>
          <select
            name="category"
            onChange={changeHandler}
            value={formData.category}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={Math.random()} value={c.id}>
                {c.value}
              </option>
            ))}
          </select>
          {categoryError && <p className="error">Please select category !</p>}
          <p className="fieldInstructions">(Select the post category)</p>
        </div>

        <div className="fieldDivs">
          <p className="fieldHeadings">Sort Order</p>
          <select
            name="sort_order"
            value={formData.sort_order}
            onChange={changeHandler}
          >
            <option value="">Select Sort Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <p className="fieldInstructions">(Select the sorting order)</p>
        </div>
        <button
          type="submit"
          className="createTextButton"
          onClick={() => postData(formData)}
        >
          Create Post
        </button>
      </form>
      {showSuccessAlert && (
        <Alert
        message='Post has been added successfully !'
        funcBtn1 ={() => {
          setShowSuccessAlert(false);
        }}
        funcBtn2 = {() => setCreatePost(false)}
        btn1Text='Add More'
        btn2Text='Back'
        />
      )}
    </div>
  );
}
