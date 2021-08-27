import "./Post.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import optionsList from "../../Assets/Images/OptionsList.png";
import Alert from "../Alerts/Alert";
import { useEffect } from "react";

export default function POST({
  index,
  setIndex,
  category,
  postDetails,
  setEditPost,
  deletePost,
  setDeleteAlert,
  deleteAlert,
}) {
  let { id, title, description } = postDetails;
  const [showOptions, setShowOptions] = useState(false);

  const options = () => {
    setShowOptions(!showOptions);
    console.log("options", showOptions);
  };

  const postEditing = () => {
    console.log("currentindex", index);
    setIndex(index);
    setEditPost(true);
  };

  return (
    <div className="postsDiv">
      <div className="postTitle">
        <div>{title}</div>
        <div onClick={options} className="postOptions">
          <img width="30px" src={optionsList} />
          <div>
            {showOptions && (
              <>
                <ul className="mainOptionList">
                  <li onClick={postEditing}>
                    <EditIcon fontSize="small" className="icons"></EditIcon>Edit
                  </li>
                  <li
                    onClick={() => {
                      setDeleteAlert(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" className="icons"></DeleteIcon>
                    Delete
                  </li>
                </ul>
                <div className="subOptionDark">
                  <ul className="subOptionList">
                    <li onClick={postEditing}>
                      <EditIcon fontSize="small" className="icons"></EditIcon>
                      Edit
                    </li>
                    <li
                      onClick={() => {
                        setDeleteAlert(true);
                      }}
                    >
                      <DeleteIcon
                        fontSize="small"
                        className="icons"
                      ></DeleteIcon>
                      Delete
                    </li>
                  </ul>
                </div>
                {deleteAlert && (
                  <Alert
                    message="Are you sure you want to delete his post?"
                    funcBtn1={() => {
                      setDeleteAlert(false);
                    }}
                    funcBtn2={() => {
                      deletePost(id, index);
                    }}
                    btn1Text="Cancel"
                    btn2Text="Delete"
                    bg="alertBtn"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="postCategory">{category}</div>
      <div className="postDescription">{description}</div>
    </div>
  );
}
