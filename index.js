require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoute = require('./src/route/userRoute');
const runMigrations = require('./src/config/migrate');
const schedule = require('node-schedule');
const cors = require('cors');

//import routes features
const categoryRoute = require('./src/route/categoryRoute');
const brandRoute = require('./src/route/brandRoute');
const productRoute = require('./src/route/productRoute');
const userRoutes = require('./src/route/userRoute');
//const posSaleRoute = require('./src/route/posSaleRoute');
const paymentMethodRoute = require('./src/route/paymentMethodRoute');
const telegramConfigRoute = require('./src/route/telegramConfigRoute');
const setAlertRoute = require('./src/route/setAlertRoute');
const customerRoute = require('./src/route/customerRoute');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
userRoutes(app);
categoryRoute(app);
brandRoute(app);
productRoute(app);
//posSaleRoute(app);
paymentMethodRoute(app);
telegramConfigRoute(app);
setAlertRoute(app);
customerRoute(app);

const PORT = process.env.PORT || 3000;

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('\n🚀 Starting server...');
    
    // Run migrations on startup
    await runMigrations();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`\n✓ Server is running on http://localhost:${PORT}\n`);
    });
  } catch (error) {
    console.error('\n✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the application
startServer();













