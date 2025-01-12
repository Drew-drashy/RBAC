const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllBlogs);
router.post('/', protect, admin, createBlog);
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router;
