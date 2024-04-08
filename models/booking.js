const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  slot: {
    start: String,
    end: String,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
