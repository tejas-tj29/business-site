import {Router} from "express";
import {Inquiry} from "../models/Inquiry.module.js";

const router = Router();

router.route('/')
      .post(async(req,res)=>{
        try{
            const {name,email,phone,message,company} = req.body;
            if (!name || !email || !phone || !message) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: All fields are mandatory."
                });
            }
            const newInquiry = await Inquiry.create({
                name,
                email,
                phone,
                message,
                company,
            });
            return res.status(201).json({
                success: true,
                message: "Inquiry successfully logged in Atlas!",
                data: newInquiry
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server Error: Could not process submission.",
                error: error.message
            });
        }
      });

export default router;