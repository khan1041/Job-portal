
import { Company } from "../models/compnay.Scema.js";
import { v2 as cloudinary } from "cloudinary";

export const Companeyregister=async(req,res)=>{

try {
    const { name} = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name:name });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        const uplod=await cloudinary.uploader.upload(req.file.path)
        

    
    
            company = await Company.create({
                name,
                logo:uplod.url,
               userId: req.user.id
            });
       


        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
} catch (error) {
    console.log(error)
}}




//CompanyFind by Id

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}


//updateCompany

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location,logo } = req.body;
        const uplod=await cloudinary.uploader.upload(req.file.path)

 const updateData = { name, description, website, location,logo:uplod.url};
     const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

