const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
router.get('/tours', tourController.getAllTours);
router.post('/tours', tourController.createTour);
router.put('/tours/:id', tourController.updateTour);

module.exports = router;