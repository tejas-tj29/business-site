import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
})

import app from './app.js';
import connectDB from './db/db_connect.js';

connectDB()
.then(() => {
    app.on('error', (err) => {
        console.error('Error occurred:', err);
        throw err;
    });
    app.listen(process.env.PORT||3000, () => {
        console.log(`Server is running on port ${process.env.PORT||3000}`);
    });
})
.catch((error) => {
    console.log("MongoDB failed to connect", error);
});