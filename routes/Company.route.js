


import express from 'express'

import { isAuthenticated,isAdmin } from '../midelware/isAdmin.js'
import { Companeyregister, getCompanyById,updateCompany } from '../controllers/company.js' 
import upload from '../midelware/Multer.js'
const Companyrouter=express.Router()

Companyrouter.post("/regCompany",isAuthenticated,isAdmin("recruiter"),upload.single("logo"),Companeyregister)
Companyrouter.get("/getCompany/:id",isAuthenticated,getCompanyById)
Companyrouter.put("/updateCompany/:id",isAuthenticated,isAdmin("recruiter"),upload.single("logo"),updateCompany)

export default Companyrouter









