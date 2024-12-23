




import { User } from "../models/UserScema.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const isAuthenticated = async (req, res, next) => {
  
    try {
      const token = req.cookies.token;
      console.log("Middleware : ", token);
      if (!token) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      req.user= user;
      req.userId=user._id

      next();
   
  } catch (error) {
      console.log(error);
  }
}
export default isAuthenticated;



//Authorization
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with given role ${req.user.role} not allowed` });
    }
    next();
  };
}





















