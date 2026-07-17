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
    companyName: {
        type: String,
        default: 'Individual Buyer',
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Quoted', 'Archived'],
        default: 'Pending',
    }
},{timestamps: true});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);