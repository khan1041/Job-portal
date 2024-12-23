

import express from 'express'

import { isAuthenticated,isAdmin } from '../midelware/isAdmin.js'
import { postJob,getAllJobs,getAdminJobs,getJobById } from '../controllers/JobControler.js'

const Jobrouter=express.Router()

Jobrouter.get("/filterAllJob",isAuthenticated,getAllJobs)
Jobrouter.post("/post",isAuthenticated ,isAdmin("recruiter"),postJob)
Jobrouter.get("/adminjob",isAuthenticated,isAdmin("recruiter"),getAdminJobs)
Jobrouter.get("/jobId/:id",isAuthenticated,getJobById)
export default Jobrouter









