const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ maintenanceRequests: [], admins: [] }).write();

const initializeAdminUser = async () => {
  const adminExists = db.get('admins').find({ username: 'admin' }).value();

  if (!adminExists) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    db.get('admins').push({
      username: 'admin',
      password: hashedPassword
    }).write();

    console.log('Default admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

initializeAdminUser().catch((err) => {
  console.error('Failed to initialize admin user', err);
});

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const maintenanceRoutes = require('./routes/maintenance-requests');

app.use('/api/auth', authRoutes);
app.use('/api/maintenance-requests', maintenanceRoutes);

module.exports = app;