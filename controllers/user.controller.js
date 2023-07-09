import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const salt = bcrypt.genSaltSync(12);

const createUser = async (req, res, next)=>{
    const {name, email, password, number} = req.body;

    try{
        if(!name | !email | !password | !number)
        return res.status(202).send({msg: "Fill the details correctly"});
        
        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(202).send({msg:"Email already exists"});
        }
        
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({...req.body, password: hashPassword});
        return res.status(200).send(user);
    } catch (e){
        next(e);
    }
};

const loginUser = async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email | !password){
        return res.send('Fill correct details');
    }

    const checkUser = await User.findOne({email});
    if(!checkUser){
        return res.status(202).send({message:"User does not exist"});
    }

    const comparedPassword = bcrypt.compareSync(password, checkUser.password);

    if(!comparedPassword){
        return res.status(202).send({message:"Invalid Credentials"});
    }

    const token = jwt.sign({_id: checkUser.id}, process.env.JWT_SECRET_KEY);
    
    return res.send({checkUser, token});
    // return res.status(200).send({message:"Logged in successfully"});
}

const findAllUsers = (req,res,next)=>{
    User.find()
    .then((r)=>{
        return res.send(r);
    })
    .catch((e)=>{
        next(e);
    });
};

const findUser= (req, res, next)=>{
    const {id} = req.params;
    User.findOne({_id:id}).populate('blogs')
    .then((r)=>{
        return res.send(r);
    })
    .catch((e)=>{
        next(e);
    });
}

export {createUser, loginUser, findAllUsers, findUser};