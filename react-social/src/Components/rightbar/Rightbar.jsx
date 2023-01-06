import "./rightbar.scss";
import React, { useContext, useEffect, useState } from 'react'
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/authContext";
import { Add, Remove } from "@mui/icons-material";
const Rightbar = ({user}) => {
  console.log(
    user
  );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER  ;
  const [friends,setFriends] = useState([]);
  const {user:currentUser,dispatch} = useContext(Authcontext);
  console.log(currentUser);
  useEffect(()=>{
    const getFriends = async()=>{
      try {
         const friendList = await axios.get(`http://localhost:2000/api/user/friends/${user._id}`);
        setFriends(friendList.data)
      } catch (error) {
     console.log(error);   
      }
    }
    getFriends();
  },[user]);
  const [followed,setFollowed] = useState(false);
  const handleClick = async()=>{
    try {
      if (followed) {
        await axios.put(`http://localhost:2000/api/user/${user._id}/unfollow`,{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id})
      } else {
        await axios.put(`http://localhost:2000/api/user/${user._id}/follow`,{userId:currentUser._id});
        dispatch({type:"FOLLOW",payload:user._id})
      }
    setFollowed(!followed)
    } catch (error) {
      console.log(error);
    }
  }
  const HomeRightBar = ()=>{
    return <>
      <div className="birthDayContainer">
          <img src={`${PF}gift.png`} className="birtdayImg" alt="" />
          <span className="birtdayText"> <b> Muneeza </b> and <b> 3 other  friends </b> have a birthday today</span>
        </div>


        <img src="assets/ad.png" className="rbAdvertisement" alt="" />
        <h4 className="rbTitle">Online Friends</h4>
        <ul className="rbFriendist">
         { Users.map(user =>{ return <Online key={user.id} user={user}/>})}

          
        </ul>
    </>
  }


  const ProfileRightBar = ()=>{

    return (
      <>
      {user?._id !== currentUser?._id && (
        <button className="followbtn" onClick={handleClick}>
          {followed ? "Unfollow":"Follow"}
          {followed ? <Remove/>:<Add/>}
 </button>
      )}
        <h4 className="uiTitle">User information</h4>
        <div className="mbInfo">
        <div className="infoContainer">
          <span className="infoKey">City:</span>
          <span className="infoValue">{user.city}</span>
        </div>
        <div className="infoContainer">
          <span className="infoKey">From:</span>
          <span className="infoValue">{user.from}</span>
        </div>
        <div className="infoContainer">
          <span className="infoKey">Relationship:</span>
          <span className="infoValue">{user.relationShip === 1 ? "Single" :
          user.relationShip === 2 ?  "Married" : "-"}</span>
        </div>
        </div>
        <h4 className="uiTitle">User friends</h4>
        <div className="rbFollowings">
          { friends.map((friend,i)=>{
            return (
          <Link key={i} to={`/profile/${friend.username}`}  style={{textDecoration:"none"}} >

              <div className="rbFollowing">
            <img src={ friend.profilePic ?  PF + friend.profilePic : PF + "person/noAvatar.png" } alt="" className="rbFollowingimg" />
            <span className="rbFollowingname">{friend.username}</span>
          </div>
          </Link>
            )
          })}
          
          
        </div>
      </>
    )
  }
  return (
    <div className="rightBar">
      <div className="rWrapper">
       {user ? <ProfileRightBar/> : <HomeRightBar/>} 
        
      </div>
    </div>
  )
}

export default Rightbar
