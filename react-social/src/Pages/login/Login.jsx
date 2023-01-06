import { useContext, useRef } from "react";
import "./login.scss";
import { loginCall } from "../../apicalls";
import { Authcontext } from "../../context/authContext";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const {dispatch,isFetching,error,user} = useContext(Authcontext); 
  const handleSubmit = (e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch);
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="lLeft">
            <h3 className="lLogo">Wesocial</h3>
            <span className="ldesc">Connect with friends and the world around you on Wesocial.</span>

        </div>
        <div className="lRight">
            <form onSubmit={handleSubmit} className="lBox">
                <input type="email" ref={email} required placeholder="Email" className="lInput" />
                <input type="password" ref={password} minLength="6" required placeholder="Password" className="lInput" />
                <button className="lBtn">{isFetching ? "loading":"Log In"}</button>
                <span className="lForgot">Forgot Password?</span>
                <button className="lRbtn">{isFetching ? "loading":"Create a new account"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login

