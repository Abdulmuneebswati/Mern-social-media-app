import './App.css';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Home from './Pages/Home/Home';
import Profile from './Pages/profile/Profile';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import { useContext } from 'react';
import { Authcontext } from './context/authContext';
function App() {
  const {user} = useContext(Authcontext);
  
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path='/profile/:username' element={<Profile/>}/>
      <Route path='/'   element={user ? <Home/> :<Register/>}/>
      <Route   path='/login' element={user ? <Navigate to="/"/>:<Login/>}/>
      <Route path='/register' element={user ? <Navigate to="/"/>:<Register/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
