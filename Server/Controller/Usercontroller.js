
import User from "../Models/User.js"
import createError from "../Middlewares/createError.js"
import bcrypt from "bcrypt"

class Usercontroller {
    
    static registerUser = async (req,res,next)=>{
        try {
            const {username,email,password} = req.body;
            const hashPassword = await bcrypt.hash(password,12);
            const user = new User({
                username:username,
                email:email,
                password:hashPassword
            })
            const saveUser = await user.save(); 
            res.status(200).json(saveUser);
        } catch (error) {
            next(error);
        }
    }

        static userLogin = async (req,res,next)=>{
            try {
                const {email,password} = req.body;
                const findUser = await User.findOne({email:email});
                !findUser && next(createError(404,"Invalid Crecedentials"))
                const isMatch = await bcrypt.compare(password,findUser.password);
                if (isMatch) {
                    let {password, isAdmin,...newUser} = findUser;
                    res.json({...newUser._doc}).status(200)
                }else{
                    next(createError(404,"Invalid Crecedentials"))
                }
            } catch (error) {
                next(error);
            }
       }

static updateUser = async(req,res,next)=>{
    try {
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password,12);
            }
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json("Account has been updated")
        }else{
            next(createError(404,"You cannot update other's account"))
        }
    } catch (error) {
        next(error)
    }
}

static deleteUser = async(req,res,next)=>{
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password,12);
            }
            const user = await User.deleteOne({_id:req.params.id});
            res.status(200).json("Account has been deleted")
        }else{
            next(createError(404,"You cannot delete other's account"))
        }
    } catch (error) {
        next(error)
    }
}



static getUser = async(req,res,next)=>{
    const userId = req.query.id;
    const username = req.query.username;
    try {
        const user = userId ?  await User.findById(userId) : await User.findOne({username:username});
        const {password,updatedAt, ...otherDetails} = user._doc;

        user ? res.status(200).json(otherDetails) : next(createError(404,"No such user"));
    } catch (error) {
        next(error)
    }
}

static followUser = async(req,res,next)=>{
    try {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json(`${user.username} has been followed by you`)
            }else{
            next(createError(404,"Already Followed"))
            }
        }else{
            next(createError(404,"You cannot follow yourself"))
        }
    } catch (error) {
        next(error)
    }
}

static unfollowUser = async(req,res,next)=>{
    try {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json(`you unfollowed ${user.username}`)
            }else{
            next(createError(404,"Already Unfollowed"))
            }
        }else{
            next(createError(404,"You cannot unfollow yourself"))
        }
    } catch (error) {
        next(error)
    }
}

static getFriends = async(req,res)=>{
    try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
        user.following.map((followingId)=>{
             return User.findById(followingId)
        })
    )   
    let friendList = [];
        friends.map((friend)=>{
            const {_id,username,profilePic} = friend;
            friendList.push({_id,username,profilePic})
        })    
        res.status(200).json(friendList)

    } catch (error) {
        res.status(500).send(error);
    }
}


}
export default Usercontroller;