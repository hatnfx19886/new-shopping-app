const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);

const clientRouter = require('./routes/client');
const adminRouter = require('./routes/admin');

const app = express();
app.use(helmet());
app.use(express.json());

const links = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://shopping-app-admin.web.app',
  'https://shopping-app-16273.web.app',
];
const corsOption = {
  origin: (origin, calback) => {
    if (links.includes(origin)) {
      calback(null, true);
    } else {
      calback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOption));

app.use(clientRouter);
app.use('/admin', adminRouter);
app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

mongoose
  .connect(uri)
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));
