import "./Header.css";
import logo from '../../Assets/Images/Logo.png'
export default function Header({createPost, setCreatePost}) {    

  const creatingPost = ()=>setCreatePost(true)

  return (
    <div className="headerDiv">
      <div className='headerContent'>
      <div className="logoDiv">
        <img src={logo} width='150px' alt='logo'/>
      </div>
      <div className='createPostButton'>
        {!createPost && <button className='createTextButton' onClick={creatingPost}>Create Post</button>}
        {!createPost && <button className='createSignButton' onClick={creatingPost}> + </button>}
      </div>
      </div>
    </div>
  );
}
