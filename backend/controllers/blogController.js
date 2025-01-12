const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = new Blog({ title, content, author: req.user.id });
        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        console.log(blog);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        const ID=req.params.id;
        await Blog.deleteOne({_id:ID})
        res.json({ message: 'Blog removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};