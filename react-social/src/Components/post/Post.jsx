import { MoreVert } from "@mui/icons-material"
import "./post.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { Authcontext } from "../../context/authContext"
const Post = ({post}) => {
  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setisLiked] = useState(false);
  const [user,setUser] = useState({});
  const {user:currentUser} = useContext(Authcontext)

  useEffect(()=>{
    setisLiked(post.likes.includes(currentUser?._id))
  },[post.likes,currentUser])


  const PF = process.env.REACT_APP_PUBLIC_FOLDER  ;
  const handleLike = ()=>{
    try {
      axios.put("http://localhost:2000/api/post/" + post._id + "/like" , {userId:currentUser._id})
    } catch (error) {
      
    }
    setLike( isLiked ? like - 1 : like + 1);
    setisLiked(!isLiked)
  }
  
  useEffect(()=>{
    const fetchUser = async()=>{
    const res = await axios.get(`http://localhost:2000/api/user?id=${post.userId}`) ;
    setUser(res.data);
    }
    fetchUser();
  },[post.userId])
  return (
    <div className='post'>
      <div className="pWrapper">
        <div className="ptop">
            <div className="ptLeft">
              <Link to={`profile/${user.username}`}> <img className="ptImg" src={PF + user.profilePic || PF + "persons/noAvatar.jpeg"} alt="" /> </Link> 
                <span className="pUsername">{user.username}</span>
                <span className="pDate">{format(post.createdAt)}</span>
            </div>
            <div className="ptRight">
                <MoreVert/>
            </div>

        </div>
        <div className="pCenter">
            <span className="pText">{post?.desc}</span>
            <img className="pImg" src={PF+post.image} alt="" />
        </div>
        <div className="pBottom">
            <div className="pbLeft">
                <img  className="likeIcon" src={`${PF}like.png`} onClick={handleLike} alt="" />
                <img className="likeIcon" src={`${PF}heart.png`} onClick={handleLike}  alt="" />
                <span className="likeCounter">{like}</span>
            </div>
            <div className="pbRight">
                <span className="pbText">{post.comment} comments</span>
            </div>

        </div>


      </div>
    </div>
  )
}

export default Post
