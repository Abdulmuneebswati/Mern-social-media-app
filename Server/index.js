import dotenv from "dotenv"
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./Routes/users.js";
import postRoute from "./Routes/postRoutes.js";
import multer from "multer";
import path from "path";
import {fileURLToPath} from 'url';
dotenv.config();



const app = express();



// db connection
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Succesfully Connected To DB"))
.catch((err)=>console.log(err));

// middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"),(req,res)=>{
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error);
    }
})




// routes
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)




// for errors
app.use((error,req,res,next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:error.stack
    })
})









app.listen(process.env.PORT,()=>{
    console.log(`listeninng at port ${process.env.PORT}`);
})