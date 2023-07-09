import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, getByCategory, getByTitle, getSoftDeletedBlogs, softDeleteBlog, updateBlog } from '../controllers/blog.controller.js';

const blogRouter = express.Router();

blogRouter.post('/create', createBlog);
blogRouter.get('/title', getByTitle);
blogRouter.get('/category', getByCategory);
blogRouter.get('/trash', getSoftDeletedBlogs);
blogRouter.get('/',getBlogs);
blogRouter.get('/:id', getBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);
blogRouter.put('/delete/:id', softDeleteBlog);



export {blogRouter};