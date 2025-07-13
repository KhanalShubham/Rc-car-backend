require('dotenv').config();

module.exports = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Frontend Configuration
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // RC Car Configuration
  rcCar: {
    ip: process.env.RC_CAR_IP || '192.168.1.100',
    port: process.env.RC_CAR_PORT || 8080,
    timeout: 5000
  },
  
  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rc_dashboard',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // JWT Configuration (for future authentication)
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-here',
    expiresIn: '24h'
  }
}; 