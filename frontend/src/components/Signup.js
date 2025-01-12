import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      alert('Error in Signup');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-90">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md" />
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;