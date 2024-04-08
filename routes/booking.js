const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookSlot', bookingController.bookSlot);
router.get('/', bookingController.getAllBookings);

module.exports = router;
