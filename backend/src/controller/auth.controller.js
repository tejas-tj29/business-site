import jwt from "jsonwebtoken";
import Admin from "../models/admin.module.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiErrorHandler.js";
import ApiResponseHandler from "../utils/ApiResponseHandler.js";

export const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new ApiError(404, "Admin not found");

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens");
  }
};

export const registerAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists!" });
    }

    const admin = await Admin.create({
      email,
      password,
    });

   const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
        );

        if(!createdAdmin){
            throw new ApiError(500, "Failed to create admin");
        }

        return res.status(201).json(
            new ApiResponseHandler(200, createdAdmin, "Admin registered successfully"),
        );
   } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const admin = await Admin.findOne({ email });

    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    // Generate Tokens using your logic
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      admin._id,
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken",
    );

    const options = { httpOnly: true , secure: true };

    return res
    .status(200)
    .cookie("refreshToken", refreshToken,options)
    .cookie("accessToken", accessToken,options)
    .json(
        new ApiResponseHandler(200, {
            user: loggedInAdmin, refreshToken, accessToken
        }
        ,"Admin logged in successfully")
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutAdmin = asyncHandler(async (req,res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new : true,
        }
    )

    const options = {
        httpOnly: true,
        secure:true,
    };
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponseHandler(200,{}, "Admin logged out successfully"),
    )
});


export const refreshAccessToken = asyncHandler(async (req,res) => {
    
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request, refresh token is missing");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
        const admin = await Admin.findById(decodedToken?._id);
    
        if(!admin){
            throw new ApiError(401, "Unauthorized request, Invalid refresh token");
        }
    
        if(incomingRefreshToken !== admin?.refreshToken)
            throw new ApiError(401, "Refresh token is expired or used");
    
        const options = {
            httpOnly: true,
            secure:true,
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);
    
        return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponseHandler(200, { accessToken, refreshToken },
            "Access token refreshed successfully"
            )
        );
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized request, Invalid refresh token");
    }
});


export const changeCurrentPassword = asyncHandler(async (req,res) => {
    const {currentPassword,newPassword} = req.body;
    if(!currentPassword){
        throw new ApiError(400, "Current password is required");
    }
    if(!newPassword){
        throw new ApiError(400, "New password is required");
    }
    const admin = await Admin.findById(req.admin?._id);
    if(!admin){
        throw new ApiError(404, "Admin not found");
    }
    const isCurrentPasswordValid = await admin.isPasswordCorrect(currentPassword);
    if(!isCurrentPasswordValid){
        throw new ApiError(400, "Current password is incorrect");
    }
    admin.password = newPassword;
    await admin.save({validateBeforeSave:false});

    return res
    .status(200)
    .json(
        new ApiResponseHandler({},200,"Password changed successfully"),
    );
});