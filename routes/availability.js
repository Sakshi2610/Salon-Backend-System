const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
router.post('/', availabilityController.setAvailability);
router.get('/:date', availabilityController.getAvailableSlots);

module.exports = router;
