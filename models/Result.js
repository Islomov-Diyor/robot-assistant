const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  pose: {
    type: String,
    enum: ['Turgan', "O'tirgan", 'Yiqilgan', 'Yurmoqda'],
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  advice: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
