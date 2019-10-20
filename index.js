const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

const app = express();

// Connect DB
connectDB();

app.use(express.json({ extended: false }));
app.use(morgan('tiny'));

// Routes Middleware
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${port}`));
