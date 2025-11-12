const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json()); // allows JSON body parsing

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
