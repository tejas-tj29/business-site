import jwt from "jsonwebtoken";
import {Admin} from "../models/admin.module.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiErrorHandler.js";

export const verifyJWT = asyncHandler(async (req,_,next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") ;
        
        if(!accessToken){
            throw new ApiError(401, "Unauthorized request, access token is missing");
        }
    
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
        const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken");
        
        if(!admin){
            throw new ApiError(401, "Unauthorized request, admin not found");
        }
    
        req.admin = admin;
        next();
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized request, invalid access token");
    }

});