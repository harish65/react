const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/countries', locationController.getCountries);
router.get('/states/:countryCode', locationController.getStatesByCountry);

module.exports = router;