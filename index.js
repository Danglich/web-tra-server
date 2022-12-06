import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';
import categoryPostRouter from './routes/categoryPost.js';
import postRouter from './routes/post.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@web-tra.mjpr8ef.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );

        console.log('MongoDB connected !!!');
    } catch (error) {
        console.log('Connect to MongoDB failed: ' + error);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).json('Hello xin chào');
});

app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/categoryPost', categoryPostRouter);
app.use('/api/post', postRouter);

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
