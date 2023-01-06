import express, { Router } from "express";
import Postcontroller from "../Controller/PostsController.js";

const postRoute = express.Router();

// create post
postRoute.post("/",Postcontroller.createPost)
// update post
postRoute.put("/:id",Postcontroller.updatePost)
// delete post
postRoute.delete("/:id",Postcontroller.deletePost)

// like/dislike post
postRoute.put("/:id/like",Postcontroller.updateLikeorDisLike)

// get post
postRoute.get("/:id",Postcontroller.getPost)

// get timeline posts

postRoute.get("/timeline/:id",Postcontroller.getTimelinePosts)

// get user all post 
postRoute.get("/profile/:username",Postcontroller.getProfilePosts)

export default postRoute;