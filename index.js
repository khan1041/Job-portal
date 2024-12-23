



import express from 'express'


import conectedDb from './DB/dbconection.js'
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
import cors from 'cors'
import { Route } from 'react-router-dom'
import router from './routes/userroutes.js'
import Companyrouter from './routes/Company.route.js';
import Jobrouter from './routes/Jobroutes.js';
import Applicationrouter from './routes/Application.route.js';
import cookieParser from "cookie-parser";
import { errorMiddleware } from './midelware/errorhandel.js';
//import { errorMiddleware } from './midelware/errorhandel.js';
import fileUpload from 'express-fileupload'
const app = express()

app.use(express.json())

app.use(cookieParser());

export default app



app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


//app.use("/uplods",express.static("./uplods"))

//import fileUpload from 'express-fileupload'


app.use('/app/auth',router)
app.use('/app/auth',Jobrouter)
app.use('/app/auth',Applicationrouter)
app.use('/app/auth',Companyrouter)

const port=8000


app.use(fileUpload({

  useTempFiles:true,
  tempFileDir:"/tmp",
 }))
 app.use(express.static('public'))



 dotenv.config()


 cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env. CLOUD_API_KEY, 
  api_secret:process.env.API_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});

 
 app.use(errorMiddleware)

conectedDb().then(()=>{
  app.listen(port,()=>{
   console.log(`surver is running at port:${port}`)    
  })
})







