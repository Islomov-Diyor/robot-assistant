require('dotenv').config();

const mongoose = require('mongoose');
const Result = require('./models/Result');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/poseai_robot';

const samples = [
  { pose: 'Turgan', duration: 52, advice: 'Ajoyib! Siz faol holatdasiz.' },
  { pose: "O'tirgan", duration: 1800, advice: "Diqqat! Uzoq o'tirmang, har 30 daqiqada turing." },
  { pose: 'Yurmoqda', duration: 240, advice: "Zo'r! Harakat sog'liq uchun foydali." },
  { pose: 'Turgan', duration: 95, advice: 'Ajoyib! Siz faol holatdasiz.' },
  { pose: 'Yiqilgan', duration: 12, advice: 'XAVF! Yiqilish aniqlandi! Yordam kerakmi?' },
  { pose: "O'tirgan", duration: 960, advice: "Diqqat! Uzoq o'tirmang, har 30 daqiqada turing." },
  { pose: 'Yurmoqda', duration: 310, advice: "Zo'r! Harakat sog'liq uchun foydali." },
  { pose: 'Turgan', duration: 130, advice: 'Ajoyib! Siz faol holatdasiz.' },
  { pose: "O'tirgan", duration: 740, advice: "Diqqat! Uzoq o'tirmang, har 30 daqiqada turing." },
  { pose: 'Yurmoqda', duration: 420, advice: "Zo'r! Harakat sog'liq uchun foydali." }
].map((item, index) => ({
  ...item,
  timestamp: new Date(Date.now() - index * 3600 * 1000)
}));

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Result.deleteMany({});
    await Result.insertMany(samples);
    console.log("10 ta namunaviy natija qo'shildi.");
  } catch (error) {
    console.error('Seed xatoligi:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
