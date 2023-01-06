import "./profile.scss"
import Feed from "../../Components/feed/Feed"
import Rightbar from "../../Components/rightbar/Rightbar"
import Sidebar from "../../Components/sidebar/Sidebar"
import Topbar from "../../Components/topbar/Topbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const Profile = () => {
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER  ;
  const [user,setUser] = useState({});
  useEffect(()=>{
    const fetchPost = async()=>{
    const res = await axios.get(`http://localhost:2000/api/user?username=${username}`);
    setUser(res.data);
    }
    fetchPost();
  },[username])
  return (
    <div>
    <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
    <div className="prTop">
      <div className="pCover">
      <img src={ PF + user.coverPic || PF + "persons/noCover.png"} alt="" className="coverPic" />
      <img src={ PF + user.profilePic || PF + "persons/noAvatar.png"} alt="" className="profilePic" />
      </div>
      <div className="pInfo">
        <h4 className="piName">{user.username}</h4>
        <span className="piDesc">{user.desc}</span>
      </div>
    </div>
    <div className="prBottom">
    <Feed username = {username}/>
    <Rightbar user={user}/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Profile
