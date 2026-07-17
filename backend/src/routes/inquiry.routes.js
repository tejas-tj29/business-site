import { Router } from "express";
import { Inquiry } from "../models/Inquiry.module.js";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const inquirySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s'\-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().email({ message: "Invalid email address format!" }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number cannot exceed 15 characters"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters long")
    .max(1000, "Message cannot exceed 1000 characters"),
  companyName: z.string().optional(),
});

const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many inquiries from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const allInquiries = await Inquiry.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: allInquiries.length,
        data: allInquiries,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error: Unable to fetch inquiries from the database.",
        error: error.message,
      });
    }
  })
  .post(inquiryLimiter, async (req, res) => {
    try {
      const validation = inquirySchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid data format!",
          errors: validation.error.flatten().fieldErrors // This extracts specific field errors
        });
      }

      const { name, email, phone, message, companyName } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: All fields are mandatory.",
        });
      }

      const newInquiry = await Inquiry.create({
        name,
        email,
        phone,
        message,
        companyName: companyName || "Individual Buyer",
      });

      return res.status(201).json({
        success: true,
        message: "Inquiry successfully logged in Atlas!",
        data: newInquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error: Could not process submission.",
        error: error.message,
      });
    }
  });

router
  .route("/:id")

  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const deletedInquiry = await Inquiry.findByIdAndDelete(id);

      if (!deletedInquiry) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Inquiry cleanly purged from the cloud database cluster!",
        data: deletedInquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error: Could not complete deletion workflow.",
        error: error.message,
      });
    }
  })

  .patch(async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message:
            "Validation Error: Status field is required for this update.",
        });
      }

      const updatedInquiry = await Inquiry.findByIdAndUpdate(
        id,

        { status },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );

      if (!updatedInquiry) {
        return res.status(404).json({
          success: false,
          message: "Update Failed: No matching record found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: `Inquiry status updated to '${status}' successfully!`,
        data: updatedInquiry,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error: Could not complete update workflow.",
        error: error.message,
      });
    }
  });
export default router;
