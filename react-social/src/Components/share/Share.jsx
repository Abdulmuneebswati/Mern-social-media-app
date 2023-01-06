import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import { useContext } from "react"
import "./share.scss"
import {Authcontext} from "../../context/authContext"
import { useRef } from "react"
import { useState } from "react"
import axios from 'axios'
const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  const {user} = useContext(Authcontext)
  const desc = useRef();
  
  const [file,setFile] = useState(null);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {
      userId:user._id,
      desc:desc.current.value,
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file",file);
      data.append("name",fileName);
      newPost.image = "posts/" + fileName;
      try {
        await axios.post("http://localhost:2000/api/upload",data);
      } catch (error) {
console.log(error);
      }
    }
    try {
      
      await axios.post("http://localhost:2000/api/post/",newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="share">
      <div className="sWrapper">
        <div className="sTop">
            <img className="sImg" src={ user?.profilePic ? PF + user.profilePic : PF + "/persons/noAvatar.png"} alt="" />
            <input ref={desc} placeholder={"What's in your mind " + user?.username +"?"} className="sInput" />
        </div>
        <hr className="sHr"/>
        <form className="sBottom" onSubmit={handleSubmit}>
            <div className="sOptions">
                <label htmlFor="file" className="sOption">
                <PermMedia htmlColor="tomato" className="sIcon"/>
                    <span className="sOptiontext">Photo/video</span>
                    <input hidden type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=> setFile(e.target.files[0])} />
                </label>
                <div className="sOption">
                
                <Label htmlColor="blue" className="sIcon"/>
                    <span className="sOptiontext">Tag</span>

                </div>
                <div className="sOption">
                <Room htmlColor="green" className="sIcon"/>
                    <span className="sOptiontext">Location</span>

                </div>
                <div className="sOption">
                <EmojiEmotions  htmlColor="goldenrod" className="sIcon" />
                    <span className="sOptiontext">Feelings</span>

                </div>
            </div>
            <button className="sBtn" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
