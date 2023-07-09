import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next)=>{
    try{

        const {authorization} = req.headers;
        if(authorization){
            const token = authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findOne({_id:decoded._id});

            if(!user){
                return res.send("You are not logged In");
            }
            else{
                req.user = user;
                next();
            }
        }
        else{
            return res.send({msg: "You are not authenticated to access the file"});
        };
    }
    catch(e){

        return res.send({msg: "You are not authenticated to access the file", error: e});
    };
};

export {auth};