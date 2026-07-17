import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import authRouter from './routes/auth.routes.js';
import inquiryRouter from './routes/inquiry.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();
app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}
));

app.use(express.json({limit:"20kb"}))

app.use(express.urlencoded({extended:true,limit:"20kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Welcome to the Sarawagi Enterprises API!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/inquiries', inquiryRouter);

export default app;