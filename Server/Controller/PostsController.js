import createError from "../Middlewares/createError.js";
import Post from "../Models/Post.js";
import User from "../Models/User.js";

class Postcontroller{

    static createPost = async(req,res,next)=>{
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost)
        } catch (error) {
            next(error);
        }
    }

    static updatePost  = async(req,res,next)=>{
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({$set:req.body});
                res.status(200).json("The post has been updated")
            }else{
                next(createError(404,"You can update only your post"))
            }
        } catch (error) {
            next(error);
        }
    }
    
    static deletePost  = async(req,res,next)=>{
        try {
           const post = await Post.findById(req.params.id);
           if (post.userId === req.body.userId) {
                await post.deleteOne();
                res.status(200).json("The post has been deleted")
            }else{
                next(createError(404,"You can delete only your post"))
            }
        } catch (error) {
            next(error);
        }
    }

    static updateLikeorDisLike = async(req,res,next)=>{
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                    await post.updateOne({$push:{likes:req.body.userId}});
                res.status(200).json("The post has been liked")
            } else {
                await post.updateOne({$pull:{likes:req.body.userId}});
                res.status(200).json("The post has been disLiked")
            }
        } catch (error) {
            next(error);
        }
    }

    static getPost = async(req,res,next)=>{
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }

    static getTimelinePosts = async(req,res,next)=>{
        try {
            const currentUser = await User.findById(req.params.id);
            const userPosts = await Post.find({userId:currentUser._id}).sort({_id:-1});
            const friendPosts = await Promise.all(
                currentUser.following.map(friendId =>{
                   return Post.find({userId:friendId});
                })
            )
            
            res.status(200).json(userPosts.concat(...friendPosts));
        } catch (error) {
            next(error);
        }
    }


    static getProfilePosts = async(req,res,next)=>{
        try {
            const user = await User.findOne({username:req.params.username});
            const posts = await  Post.find({userId:user._id});
            res.status(200).json(posts); 
        } catch (error) {
            next(error);
        }
    }
    // 
} 
export default Postcontroller;