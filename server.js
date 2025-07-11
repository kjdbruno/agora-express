require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { Sequelize } = require('sequelize');
const path = require('path');
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  pingInterval: 25000,
  pingTimeout: 5000,
    cors: {
      origin: '*', // Change this to your frontend's origin http://localhost:9000
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true, // Optional, if you need to support credentials
    }
});

// Middleware
app.use(cors({
  origin: '*', // Change this to your frontend's origin http://localhost:9000
  methods: ['GET', 'POST'],
  credentials: true, // Optional, if you need to support credentials
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  })
  .finally(() => {
    console.log('🔄 Sequelize authentication attempt completed');
  });

// Routes
const AuthRoutes = require('./routes/AuthRoutes');
const AuthController = require('./controllers/AuthController');
const Auth = AuthController(io);
app.use('/api', AuthRoutes(Auth));

app.use('/api/sex', require('./routes/SexRoutes'));
app.use('/api/civilstatus', require('./routes/CivilStatusRoutes'));
app.use('/api/bloodtype', require('./routes/BloodTypeRoutes'));
app.use('/api/zone', require('./routes/ZoneRoutes'));
app.use('/api/religion', require('./routes/ReligionRoutes'));
app.use('/api/educationalattainment', require('./routes/EducationalAttainmentRoutes'));
app.use('/api/occupation', require('./routes/OccupationRoutes'));
app.use('/api/nationality', require('./routes/NationalityRoutes'));
app.use('/api/residentcategory', require('./routes/ResidentCategoryRoutes'));
app.use('/api/resident', require('./routes/ResidentRoutes'));
app.use('/api/barangaysetting', require('./routes/BarangaySettingRoutes'));
app.use('/api/position', require('./routes/PositionRoutes'));
app.use('/api/officialsetting', require('./routes/OfficialSettingRoutes'));

require('./sockets')(io);

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
