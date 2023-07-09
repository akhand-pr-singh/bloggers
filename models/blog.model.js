import {Schema, model} from 'mongoose';

const blogSchema = new Schema({
    title:{required:true, type: String},
    description: {required: true, type: String},
    category: {type: String, required:true},
    createdAt: {default: Date.now(), type: String},
    deleted: {default:false, type:Boolean},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Blog = model('blog',blogSchema);

export {Blog};