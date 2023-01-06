import { RssFeed, Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School, } from "@mui/icons-material";
import { Users } from "../../dummyData";
import Closefriend from "../closefriends/Closefriend";
import "./sidebar.scss";
const Sidebar = () => {
  return (
    <div className="sideBar">
      <div className="sbWrapper">
      <ul className="sbList">
        <li className="sbListitem">
          <RssFeed className="sbIcon"/>
          <span className="sbText">Feed</span>
        </li>
        <li className="sbListitem">
            <Chat className="sbIcon" />
            <span className="sbText">Chats</span>
          </li>
          <li className="sbListitem">
            <PlayCircleFilledOutlined className="sbIcon" />
            <span className="sbText">Videos</span>
          </li>
          <li className="sbListitem">
            <Group className="sbIcon" />
            <span className="sbText">Groups</span>
          </li>
          <li className="sbListitem">
            <Bookmark className="sbIcon" />
            <span className="sbText">Bookmarks</span>
          </li>
          <li className="sbListitem">
            <HelpOutline className="sbIcon" />
            <span className="sbText">Questions</span>
          </li>
          <li className="sbListitem">
            <WorkOutline className="sbIcon" />
            <span className="sbText">Jobs</span>
          </li>
          <li className="sbListitem">
            <Event className="sbIcon" />
            <span className="sbText">Events</span>
          </li>
          <li className="sbListitem">
            <School className="sbIcon" />
            <span className="sbText">Courses</span>
          </li>
      </ul>
      <button className="sbBtn">Show More</button>
      <hr className="sbHr"/>
      <ul className="sbFriendlist">
        
       {Users.map(user => {return <div key={user.id}><Closefriend  user={user}/> </div> })}
      </ul>
      </div>
    </div>
  )
}

export default Sidebar
