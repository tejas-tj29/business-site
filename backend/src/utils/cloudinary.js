import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        // 3. New Promise:
        // Cloudinary ka upload process asynchronous hota hai, isliye hum Promise 
        // return kar rahe hain taaki hum wait kar sakein ki upload kab hua.
        return new Promise((resolve, reject) => {
            
            // 4. upload_stream:
            // Yeh Cloudinary ka special function hai jo direct Buffer (RAM) se 
            // data accept karta hai.
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto",
                  folder: "sarawagi_products"
                }, // File type (image/video) auto detect karta hai.
                (error, result) => {
                    if (error) reject(error); // Agar error aaya, promise reject karo.
                    resolve(result);         // Agar success hua, URL wapas bhej do.
                }
            );
            
            // 5. stream.end(fileBuffer):
            // Buffer ka data pipe mein daal kar stream close kar do.
            stream.end(fileBuffer);
        });
    } catch (error) {
        console.error("Cloudinary Error:", error);
        return null;
    }
};