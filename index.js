const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:30001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'RC Dashboard Backend is running'
  });
});

// User routes
app.use('/api/users', userRoutes);

// RC Car control endpoints
app.get('/api/rc/status', (req, res) => {
  // TODO: Implement actual RC car status logic
  res.json({
    status: 'connected',
    battery: 85,
    speed: 0,
    direction: 'forward'
  });
});

app.post('/api/rc/control', (req, res) => {
  const { command, value } = req.body;
  
  // TODO: Implement actual RC car control logic
  console.log(`RC Control: ${command} - ${value}`);
  
  res.json({
    success: true,
    command,
    value,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: config.nodeEnv === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, config.mongodb.options)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚗 RC Dashboard Backend running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`👥 User API: http://localhost:${PORT}/api/users`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

module.exports = app;
