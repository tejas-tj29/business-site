import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is mandatory"],
        trim: true
    },
    company: {
        type: String,
        default: 'Individual Buyer',
    },
    message: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['Pending', 'Quoted', 'Archived'],
        default: 'Pending',
    }
},{timestamps: true});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);