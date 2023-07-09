import express from 'express';
import { createUser, findAllUsers, findUser, loginUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', findAllUsers);
userRouter.get('/:id', findUser);
 
export {userRouter};
