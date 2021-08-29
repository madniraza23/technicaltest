import cancel from "../../Assets/Images/Cancel.png";
import "./EditPost.css";
import { useState } from "react";
export default function EditPost({
  currCategory,
  postDetails,
  index,
  setEditPost,
}) {
  const { id, title, description, category, sort_order } = postDetails[index];
  const [editedValue, setEditedValue] = useState({});
  const [editedData, setEditedData] = useState({
    title,
    description,
    category,
    sort_order,
  });

  const changeHandler = (event) => {
    let value = event.target.value;
    setEditedData({ ...editedData, [event.target.name]: value });
    setEditedValue({
      [event.target.name]: value,
    })
    ;
  };

  const submitHandler = (e) => e.preventDefault();

  const updatePost = async () => {
    if (!editedData.title || !editedData.description || !editedData.category) {
      alert("Please Add Necessary Data");
    } else {
      postDetails[index] = editedData

      await fetch(
        `https://us-central1-react-test-dd08f.cloudfunctions.net/posts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "test-id": "086754ee-01f4-11ec-9a03-0242ac130003",
          },
          body: JSON.stringify(editedData),
        }
      )
        .then((response) => {
          console.log(response);
          setEditPost(false)
        })
        .catch((e) => alert("error", e.message));
    }
  };

  return (
    <>
      <div  className="editPostDiv">
        <form onSubmit={submitHandler}>
          <div className="editformHeading">
            <div>Edit Post</div>
            <div>
              <img
                src={cancel}
                style={{ cursor: "pointer", width: "25px" }}
                onClick={() => {
                  setEditPost(false);
                }}
              />
            </div>
          </div>
          <div className="editfieldDivs">
            <p className="editfieldHeadings">Title</p>
            <input
              maxLength="50"
              name="title"
              value={editedData.title}
              onChange={changeHandler}
            />
            <p className="editfieldInstructions">(Maximum 50 characters)</p>
          </div>

          <div className="editfieldDivs">
            <p className="editfieldHeadings">Description</p>
            <textarea
              maxLength="150"
              className="editdescriptionInput"
              name="description"
              value={editedData.description}
              onChange={changeHandler}
            ></textarea>
            <p className="editfieldInstructions">(Maximum 150 characters)</p>
          </div>

          <div className="editfieldDivs">
            <p className="editfieldHeadings">Category</p>
            <select
              name="category"
              value={editedData.category}
              onChange={changeHandler}
            >
              <option value="">Select Category</option>
              {currCategory.map((c) => {
                return (
                  <option key={Math.random()} value={c.id}>
                    {c.value}
                  </option>
                );
              })}
            </select>
            <p className="editfieldInstructions">(Select the post category)</p>
          </div>

          <div className="editfieldDivs">
            <p className="editfieldHeadings">Sort Order</p>
            <select
              name="sort_order"
              value={editedData.sort_order}
              onChange={changeHandler}
            >
              <option value="">Select Sort Number</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <p className="editfieldInstructions">(Select the sorting order)</p>
          </div>
          <button type="submit" className="updateButton" onClick={updatePost}>
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}
