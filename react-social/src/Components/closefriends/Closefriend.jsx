import "./closefriend.scss"

const Closefriend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER  ;

  return (
    <li className="sbFriend">
          <img  className="sbfimg" src={PF+user.profilePicture} alt="" />
          <span className="sbfName">{user.username}</span>
        </li>
  )
}

export default Closefriend
