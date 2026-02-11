import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [postImage,setPostImage] = useState(null);
  const [caption,setCaption] = useState("");
  const [style,setStyle] = useState("");
  const [showPost,setshowPost] = useState(false);
  const [posts,setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const savedUser = localStorage.getItem("username");
    if(savedUser){
      setUsername(savedUser);
    }
    else 
      {
        navigate("/login");
      }
  },[]);

  useEffect(() => {
    if(!username) return;
    const saved = localStorage.getItem(`${username}_profileImage`);
    if(saved) setImage(saved);
  }, [username]);

 useEffect(() => {
  if (!username) return;

  const loadPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/posts/users/${username}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Load posts error", err);
    }
  };

  loadPosts();
}, [username]);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result);   
    localStorage.setItem(`${username}_profileImage`, reader.result);
  };
  reader.readAsDataURL(file);
};

  const removeProfile = () => {
    setImage(null);
    localStorage.removeItem(`${username}_profileImage`);
  };

  const handleCreatePost = async () => {
  if (!postImage || !caption || !style) {
    alert("Kindly select Image, caption and style");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: postImage,
        caption: caption,
        style: style,
        owner: username,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Post failed");
      return;
    }

    const savedPost = await res.json();

    setPosts((prev) => [savedPost, ...prev]);
    setPostImage(null);
    setCaption("");
    setStyle("");
    setshowPost(false);
  } catch (err) {
    console.error("Post error:", err);
    alert("Server not responding");
  }
};

const handleDelete= async (postId) =>
  {
     if(!window.confirm("Are you sure you want to delete the post ?"))
      return;
    try{
      const res = await fetch(`http://localhost:5000/posts/${postId}`,
        {
          method: "DELETE",
        });

        const data = await res.json();
        
        if(!res.ok){
          alert(data.message || "DELETE failed");
          return;
        }

        setPosts((prev) => prev.filter((p) => p._id !== postId));

    }
    catch(err){
      console.error("DELETE EROR",err);
      alert("server error")
    }
};

  return (
    <div id="mainone">
      <img src="digital_art_gallery_logo.png" alt="logo" id="logo" />
      <button id ="logout" onClick={()=> {alert("Successfully Loggedout");navigate("/")}}>Logout</button>

      <h2 id="headings">Profile</h2>

      <img
        src={image || "profile_logo.png"}
        alt="profile"
        id="profile"
        onClick={() => document.getElementById("profilefile").click()}
      />
       <input
        id="profilefile"
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageChange}/>

      <h4 id="h41">{username ? username:"guest"}</h4>

      <div id="div11">
        <button id="bt3" onClick={removeProfile}>Remove</button>
        
        <div id="sidebar">
      <button id="bt1" onClick={() => navigate("/search")}>
          <img alt="searchbtn" src="Search_logo.png" id="option1" />
        </button>
        <button id="post" onClick={()=> document.getElementById("postfile").click()}>+</button>
        </div>
      <input
        id="postfile"
        type="file"
        hidden
        accept="image/*"
        onChange={(e)=>{
          const file = e.target.files[0]
          if(!file) return;
          const reader = new FileReader();
          reader.onloadend = () =>{
            setPostImage(reader.result);
            setshowPost(true);
          };
          reader.readAsDataURL(file);
        }}
      />
       </div>
       {showPost && (
        <div style ={{background: "black",padding :"15px",borderRadius: "10px",margin:"20px"}}>
          <h3>Create Post</h3>
          <img src={postImage} alt="preview" style={{width:"200px",borderRadius:"10px"}}/>
          <br/> <br/>

          <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e)=>setCaption(e.target.value)}/>

          <br/>
          <br/>
          <select value={style} onChange={(e)=>setStyle(e.target.value)}>
          <option value={""}>select Art Style</option>
          <option value={"Sketch"}>Sketch</option>
          <option value={"Painting"}>Painting</option>
          <option value={"oilPainting"}>oilPainting</option>
          <option value={"Digital Art"}>Digital Art</option>
           <option value={"Cartoon"}>Cartoon</option>
          </select>
          <br/><br/><br/>
          <button onClick={handleCreatePost}>Post</button>
          <button onClick={()=>setshowPost(false)}>Cancel</button>
          </div>
)}
       <h3 id="h41">Posts</h3>
       <div className="postGrid">
        {posts.length === 0 && <p style={{fontStyle:"italic" , fontWeight:"bold",fontSize:"large", padding:"20px"}}>No Post Yet</p>}
        {posts.map((p)=>(
          <div key={p._id} className="postCard">
            <img src={p.image} alt="post" style={{width:"200px", borderRadius:"10px",color:"white"}}/>
            <p style={{color:"cyan"}}>{p.caption}</p>
            <small style={{color:"white"}}>{p.style}</small>
            <button style={{marginTop:"5px",marginLeft:"100px"}} onClick={()=>handleDelete(p._id)}>🗑️</button>
          </div>
        ))}
        
       </div>
      
    </div>
  );
}

export default Home;