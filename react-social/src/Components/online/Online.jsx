import React from 'react'

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER  ;
  return (
    <li className="rbFriend">
            <div className="rbImgcon">
              <img src={PF+user.profilePicture} className="rbImg" alt="" />
              <span className="rbOnline"></span>
            </div>
            <span className="rbUsername">{user.username}</span>
          </li>
  )
}

export default Online
