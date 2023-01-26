const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ErrorResponse = require('./middleWare/ErrorResponse');
const UserRoutes = require('./routes/UserRoutes');
const BlogRoutes = require('./routes/BlogRoutes');
const RealStateRoutes = require('./routes/RealStateRoutes');
const AdRoutes = require('./routes/AdRoutes');
const AdExpireRoutes = require('./routes/AdExpireRoutes');

dotenv.config({ path: 'config/.env' });

const app = express();

app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'https://realestate-mern-mostaql-1.herokuapp.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'frontend/build/')));
app.use(cookieParser());

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/blog', BlogRoutes);
app.use('/api/v1/real-state', RealStateRoutes);
app.use('/api/v1/ad', AdRoutes);
app.use('/api/v1/adExpire', AdExpireRoutes);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/frontend/build/index.html`);
});

// Error MiddleWare
app.use(ErrorResponse);

module.exports = app;
