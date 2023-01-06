import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss"
import axios from "axios";
import { Authcontext } from "../../context/authContext";

const Feed = ({username}) => {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(Authcontext);
  useEffect(()=>{
    const fetchPost = async()=>{
    const res = username ?  await axios.get("http://localhost:2000/api/post/profile/" + username) :
    await axios.get("http://localhost:2000/api/post/timeline/" + user._id)
    setPosts(res.data);
    }
    fetchPost();
  },[username,user])
  return (
    <div className="feed">
      <div className="fWrapper">
       { username === user?.username && <Share/>}
        {
          posts.map( (P,i) => {
           return <Post key={i} post={P}/>
          })
        }
        

      </div>  
    </div>
  )
}
export default Feed;
