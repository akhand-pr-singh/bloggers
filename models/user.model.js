import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    number:{type:Number, required: true},
    blogs: [{type: Schema.Types.ObjectId, ref:'blog'}]
});

const User = model('user',userSchema);

export {User};