import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();

    // Listen for real-time updates
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/blogs', { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.emit('newBlog', data);
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Error creating blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.emit('deleteBlog', id);
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-black bg-opacity-90">
      <h2 className="text-4xl font-bold text-center text-white mb-8">Admin Dashboard</h2>
      <form onSubmit={handleCreate} className="max-w-lg mx-auto space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required className="w-full px-4 py-2 border rounded-md"></textarea>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Create Blog</button>
      </form>
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="card">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="mt-2 text-gray-300">{blog.content}</p>
            <button onClick={() => handleDelete(blog._id)} className="mt-4 px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;