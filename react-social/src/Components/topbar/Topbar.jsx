import { Chat, Notifications, Person, Search } from "@mui/icons-material"
import { Link } from "react-router-dom";
import "./topbar.scss";
import {useContext } from "react";

import { Authcontext } from "../../context/authContext";
const Topbar = () => {
  const {user} = useContext(Authcontext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topBar">
    {/* left */}
      <div className="tleft">
       <Link to="/" style={{textDecoration:"none" , color:"white"}}> <span   className="logo">Wesocial</span></Link>
      </div>

    {/* center */}
      <div className="tcenter">
      <div className="tsbar">
        {/* search bar */}
        <Search className="sicon"/>
        <input type="text" placeholder="Search for any friend, post or video" className="" />
      </div>

      </div>


{/* right */}
      <div className="tright">
        <div className="links">
            <span className="">Home</span>
            <span className="">Timeline</span>

        </div>
        {/* icons */}
        <div className="ticons">
            <div className="teicon">
            <Person/>
            <span className="tbadge">1</span>
            </div>
            <div className="teicon">
            <Notifications/>
            <span className="tbadge">2</span>
            </div>
            <div className="teicon">
            <Chat/>
            <span className="tbadge">1</span>
            </div>
        </div>
      <Link to={`profile/${user?.username}`}> <img src={ user?.profilePic ? PF + user?.profilePic : PF + "persons/noAvatar.png"} alt="" className="timg" /> </Link> 
      </div>
      
    </div>
  )
}

export default Topbar
