import express from "express";
import {connection} from "./config/db.js";
import dotenv from 'dotenv';
import {userRouter} from './routes/user.route.js';
import {blogRouter} from './routes/blog.route.js';
import {auth} from './middlewares/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>{
    res.send('Welcome');
});

app.use('/users', userRouter);
app.use('/blogs', auth, blogRouter);

app.listen(process.env.PORT, async()=>{
    await connection;
    console.log(`Server is running on ${process.env.PORT}`);
})
