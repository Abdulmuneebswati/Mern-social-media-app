import express, { Router } from "express";
import Usercontroller from "../Controller/Usercontroller.js";


const userRoute = express.Router();

// create User

userRoute.post("/register",Usercontroller.registerUser);

// Login
userRoute.post("/login",Usercontroller.userLogin);

// update user
userRoute.put("/:id",Usercontroller.updateUser)



// delete user

userRoute.delete("/:id",Usercontroller.deleteUser)



// get user
userRoute.get("/",Usercontroller.getUser);

//get friends
userRoute.get("/friends/:userId",Usercontroller.getFriends)



// follow a user

userRoute.put("/:id/follow",Usercontroller.followUser)


// unfolllow user

userRoute.put("/:id/unfollow",Usercontroller.unfollowUser)








export default userRoute;
