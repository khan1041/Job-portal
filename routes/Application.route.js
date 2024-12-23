
import express from 'express'

import { isAuthenticated,isAdmin } from '../midelware/isAdmin.js'
import upload from '../midelware/Multer.js'
import { applyJob,getApplicants, updateStatus } from '../controllers/Application.js'

const Applicationrouter=express.Router()

Applicationrouter.post("/apply/:id",upload.single("resume"),isAuthenticated,applyJob)
Applicationrouter.get("/applicant/:id",isAuthenticated,getApplicants)
Applicationrouter.post("/update1/:id",isAuthenticated,isAdmin("recruiter"),updateStatus)

export default Applicationrouter










