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
  setPostId,
  category,
  postDetails,
  setEditPost,
  setDeleteAlert
}) {
  let { id, title, description } = postDetails;
  const [showOptions, setShowOptions] = useState(false);

  const options = () => {
    setShowOptions(!showOptions);
  };

  const postEditing = () => {
    setIndex(index);
    setEditPost(true);
  };

  const confirmDelete = (index) => {
    setPostId(id)
    setDeleteAlert(true)
    setIndex(index)
  }

  return (
    <div className="postsDiv">
      <div className="postTitle">
        <div>{title}</div>
        <div onClick={options} className="postOptions">
          <img width="30px" src={optionsList} />
          <div>
            {showOptions && (
              <>
              <div className='optionHighLight'></div>
                <ul className="mainOptionList">
                  <li onClick={postEditing}>
                    <EditIcon fontSize="small" className="icons"></EditIcon>Edit
                  </li>
                  <li
                    onClick={() => {
                      confirmDelete(index);
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
