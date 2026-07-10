const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('Job Portal API Running 🚀'));

app.listen(process.env.PORT || 5000, () =>
    console.log('Server running on port 5000 🚀')
);