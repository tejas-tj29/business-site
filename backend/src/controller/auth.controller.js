import jwt from "jsonwebtoken";
import admin from "../models/admin.module.js";

export const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new Error("Admin not found");
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(500, "Failed to generate tokens");
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
    res
      .status(201)
      .json({ success: true, message: "Admin Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error(400, "Email is required");

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

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, message: "Admin logged in successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};