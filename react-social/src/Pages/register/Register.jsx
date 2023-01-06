import axios from "axios";
import { useRef } from "react";
import "./register.scss"
import {useNavigate} from "react-router-dom";
const Register = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords not match")
    } else{
      const user = {
        username:username.current.value,
        password:password.current.value,
        email:email.current.value
      }
try {
  await axios.post("http://localhost:2000/api/user/register",user);
  navigate("/login")
} catch (error) {
  console.log(error);
}      
    }
  }
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="lLeft">
            <h3 className="lLogo">Wesocial</h3>
            <span className="ldesc">Connect with friends and the world around you on Wesocial.</span>

        </div>
        <div className="lRight">
            <form className="lBox" onSubmit={handleSubmit}>
                <input type="text"  ref={username}  placeholder="Username" className="lInput" />
                <input type="email"  ref={email} placeholder="Email" className="lInput" />
                <input type="password"  ref={password} minLength="6" placeholder="Password" className="lInput" />
                <input type="password" ref={passwordAgain}  placeholder="Password Again" className="lInput" />
                <button className="lBtn">Sign Up</button>
                <button className="lRbtn">Log into account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
