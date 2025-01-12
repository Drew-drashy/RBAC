import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(data);
    };
    fetchBlogs();

    // Listen for real-time blog updates
    socket.on('updateBlogs', (newBlog) => {
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    });

    socket.on('removeBlog', (blogId) => {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    });

    return () => {
      socket.off('updateBlogs');
      socket.off('removeBlog');
    };
  }, []);

  return (
    <div className="p-8 min-h-screen bg-black bg-opacity-90">
      <h2 className="text-4xl font-bold text-center text-white mb-8">All Blogs</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="card">
            <h3 className="text-2xl font-semibold text-white">{blog.title}</h3>
            <p className="mt-2 text-gray-300">{blog.content}</p>
            <p className="mt-1 text-sm text-gray-400">By: {blog.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;