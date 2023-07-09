import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const url = "mongodb+srv://akhand:d7RjjchqXMdJWSqZ@cluster0.1sj6nrf.mongodb.net/";

const connection = mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to database'))
.catch(()=>console.log('error'));

export {connection};