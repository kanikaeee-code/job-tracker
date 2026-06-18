const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));