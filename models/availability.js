const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  day: String,
  slots: [
    {
      start: String,
      end: String,
      maxCapacity: Number,
    },
  ],
});

module.exports = mongoose.model('Availability', availabilitySchema);
