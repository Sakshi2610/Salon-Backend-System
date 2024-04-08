const Availability = require('../models/availability');
const Booking = require('../models/booking'); 

exports.setAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    await Availability.deleteMany(); 
    await Availability.insertMany(availability);
    res.status(200).json({ message: 'Availability set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Setting availability failed' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    
    const availability = await Availability.findOne({ day: date });

    if (!availability) {
      return res.json({ availableSlots: [] });
    }

    let availableSlots = [];

    availability.slots.forEach(async slotSet => {
      const filteredSlots = await Promise.all(slotSet.slots.map(async slot => {
        const existingBookingsCount = await Booking.countDocuments({ date, 'slot.start': slot.start, 'slot.end': slot.end });

        if (existingBookingsCount < slot.maxCapacity) {
          return { ...slot, fullyBooked: false };
        }
      }));

      availableSlots = availableSlots.concat(filteredSlots.filter(Boolean));
    });

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ error: 'Fetching available slots failed' });
  }
};
