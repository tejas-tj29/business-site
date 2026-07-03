import express from 'express';

import inquiryRouter from './routes/inquiry.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Sarawagi Enterprises API!');
});


app.use('/api/v1/inquiries', inquiryRouter);

export default app;