

import express from 'express'
import { ragister,Login,logout,updateProfile } from '../controllers/Usercontrol.js'
import { isAuthenticated,isAdmin } from '../midelware/isAdmin.js'
import upload from '../midelware/Multer.js'
const router=express.Router()

router.post('/register',upload.single("profile"),ragister)
router.post('/login',Login)
router.get('/logout',logout)
router.post("/update",isAuthenticated,updateProfile)


export default router




// {
//     "fullname":"skkhan",
//     "email":"moo1515@gamil.com",
//     "phoneNumber":12345612344,//     "password":"asd123",
//     "role":"student"
    
//     }



// {
//     "title":"node js", 
//     "description":"hello node js",
//      "requirements":"react js,nodejs", 
//      "salary":2300, 
//      "location":"tangail",
//       "jobType":"node js developer",
//       "experience":1, 
//       "position":1, 
//       "companyId":"676571912be84de2f5a4ec58"
//     }





