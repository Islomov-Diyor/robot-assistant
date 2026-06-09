require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const demoRoutes = require('./routes/demo');
const resultsRoutes = require('./routes/results');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/poseai_robot';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB ulanishi tayyor'))
  .catch((error) => console.error('MongoDB ulanishida xatolik:', error.message));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'PoseAI Robot-assistant'
  });
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bosh sahifa',
    active: 'home'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Tizim haqida',
    active: 'about'
  });
});

app.use('/demo', demoRoutes);
app.use('/results', resultsRoutes);

app.use((req, res) => {
  res.status(404).render('index', {
    title: 'Sahifa topilmadi',
    active: ''
  });
});

app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
