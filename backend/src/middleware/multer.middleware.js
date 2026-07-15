// backend/middlewares/multer.middleware.js
import multer from 'multer';

// Hum yahan 'memoryStorage' use kar rahe hain. 
// Iska matlab file disk par save nahi hogi, seedha RAM mein buffer banke rahegi.
const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB ki limit, taaki server overload na ho
});