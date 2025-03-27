const locationService = require('../services/locationService');

const getCountries = async (req, res) => {
    try {
        const countries = await locationService.getCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStatesByCountry = async (req, res) => {
    try {
        const { countryCode } = req.params;
        const states = await locationService.getStatesByCountry(countryCode);
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCountries,
    getStatesByCountry
};
