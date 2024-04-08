const Booking = require('../models/booking');
const Availability = require('../models/availability');

const moment = require('moment'); 
exports.bookSlot = async (req, res) => {
  try {
    const { userId, date, slot } = req.body;

    const dayOfWeek = moment(date).format('dddd');

    const availability = await Availability.findOne({ day: dayOfWeek });
    if (!availability) {
      return res.status(404).json({ error: 'No availability found for the requested day' });
    }

    const requestedSlot = availability.slots.find((s) => s.start === slot.start && s.end === slot.end);
    if (!requestedSlot) {
      return res.status(400).json({ error: 'Requested slot is not available' });
    }

    const existingBookingsCount = await Booking.countDocuments({ date, 'slot.start': slot.start, 'slot.end': slot.end });
    if (existingBookingsCount >= requestedSlot.maxCapacity) {
      return res.status(409).json({ error: 'Requested slot is fully booked' });
    }

    const newBooking = new Booking({ userId, date, slot });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Fetching bookings failed' });
  }
};