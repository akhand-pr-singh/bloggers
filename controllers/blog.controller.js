import {Blog} from '../models/blog.model.js';
import {User} from '../models/user.model.js'

const createBlog = async (req, res, next)=>{
    const {title, description, category} = req.body;
    try{
        if(!title | !description | !category){
            return res.status(202).send({message: "Fill the details correctly!"});
        }

        const blog = await Blog.create(req.body);

        let updatedUser = await User.updateOne(
            {_id: req.body.user },
            {$push: {blogs: blog._id}}
        );

        return res.status(200).send(blog);

        // Blog.create(req.body)
        // .then((blog)=>{
        //     return res.status(200).send(blog);
        // })
        // .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const getBlogs = (req, res, next)=>{

    const {_page, _limit} = req.query;
    const currPage = Number(_page) || 1;
    const skip = _limit*(currPage - 1);

    try{
        Blog.find().limit(_limit).skip(skip).populate('user')
        .then((blogs)=>{
            return res.status(200).send(blogs);
        })
        .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const getBlog = (req, res, next)=>{

    const {id} = req.params;

    try{
        Blog.findOne(id)
        .then((blog)=>{
            return res.status(200).send(blog);
        })
        .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const updateBlog = (req, res, next)=>{

    const {id} = req.params;

    try{

        Blog.findByIdAndUpdate(id, req.body)
        .then((r)=>res.status(200).send(r))
        .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const deleteBlog = (req, res, next)=>{
    const {id} = req.params;
    try{
        Blog.findOneAndDelete(id)
        .then(()=>res.status(200).send({message:"Blog deleted successfully!"}))
        .catch((e)=>next(e));
    }
    catch(e){
        next(e)
    };
};

const softDeleteBlog = (req, res, next)=>{
    const {id} = req.params;
    try{
        Blog.findByIdAndUpdate(id, {deleted: true})
        .then(()=>res.status(200).send({message:"Blog's soft deletion successful, Check the trash for undo changes."}))
        .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const getSoftDeletedBlogs = (req, res, next)=>{
    try{
        Blog.find({deleted:true})
        .then((blog)=>res.status(200).send(blog))
        .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    }
};

const getByCategory = (req, res, next)=>{
    const {category} = req.query;

    try{
            Blog.find({category: category.charAt(0).toUpperCase() + category.slice(1)})
            .then((blog)=>res.status(200).send(blog))
            .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};

const getByTitle = (req, res, next)=>{
    const {title} = req.query;

    try{
            Blog.find({title: title.charAt(0).toUpperCase() + title.slice(1)})
            .then((blog)=>res.status(200).send(blog))
            .catch((e)=>next(e));
    }
    catch(e){
        next(e);
    };
};


export {createBlog, getBlogs, getBlog, updateBlog, deleteBlog, softDeleteBlog, getSoftDeletedBlogs, getByCategory, getByTitle};