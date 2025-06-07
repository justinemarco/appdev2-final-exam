const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json()); // For parsing application/json

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

app.get('/', (req, res) => {
  res.send('Event Management REST API is running...');
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
});
