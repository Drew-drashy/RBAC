const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const cors = require('cors');

const http = require('http');
const { Server } = require('socket.io');
dotenv.config();



const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
})
// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newBlog', (blog) => {
    io.emit('updateBlogs', blog);
  });

  socket.on('deleteBlog', (blogId) => {
    io.emit('removeBlog', blogId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT=process.env.PORT||5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
