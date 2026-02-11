import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Search(){
const [allPosts,setAllPosts] = useState([]);
const [filter,setFilter] = useState("");
const [selectedPost,setSelectedPost] = useState(null);
const navigate = useNavigate();

useEffect(()=>{
  loadAllPosts();
},[]);

const loadAllPosts = async () => {
  try {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    setAllPosts(data);
  } catch (err) {
    console.error("Load all posts error", err);
  }
};

const filteredPosts = filter === "" ? allPosts:allPosts.filter((p)=>p.style === filter);
return(
<div className="divv">
 <div style={{justifyContent:"center", display:"flex"}}> <h3 id ="searchHeading">Search</h3>
 </div>
 <br/>
  <div id = "flexbox">
    <select id ="Select"value={filter} onChange={(e)=>setFilter(e.target.value)}>
    <option className="op" value={""}>select Art Style</option>
          <option className="op" value="Sketch">Sketch</option>
          <option className="op" value="Painting">Painting</option>
          <option  className="op" value="oilPainting">oilPainting</option>
          <option className="op" value="Digital Art">Digital Art</option>
           <option className="op" value="Cartoon">Cartoon</option>
  </select>
  <br/>
 <button id="backbtn" onClick={()=> navigate("/home")}>Back</button>
 </div>
  <br/>
  <div className="postGrid">
  {filteredPosts.length === 0 && <p style={{fontStyle:"italic" , fontWeight:"bold",fontSize:"large", padding:"20px"}}> No post found</p>}
  {filteredPosts.map((p)=>(
    <div key ={p._id} className="postCard">
      <img src={p.image} alt="posts" onClick={()=> setSelectedPost(p)} style={{cursor:"pointer"}}></img>
      <p style={{color:"cyan"}}>{p.caption}</p>
      <small style={{color:"white"}}>{p.style}</small>
      </div>
  ))}
  </div>
  {selectedPost && selectedPost.image && (
    <div className = "previewImage" onClick={() => setSelectedPost(null)}>
      <div className="previewbox" onClick={(e)=> e.stopPropagation()}>
        <img src={selectedPost.image} alt="large image"/>
        <p style={{color:"white"}}>{selectedPost.caption}</p>
        <small style={{color:"white"}}>{selectedPost.style}</small>
        <br/>
        <button onClick={()=> setSelectedPost(null)}>Close</button>
      </div>
      </div>
  )}
 
</div>
);
}
 export default Search;