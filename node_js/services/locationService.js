const axios = require('axios');

const API_URL = process.env.API_URL;

const getCountries = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data.map(country => ({
        name: country.name.common,
        code: country.cca2
    }));
};

const getStatesByCountry = async (countryCode) => {
    // Sample states API — adjust this according to actual source
    const response = await axios.get(`https://www.universal-tutorial.com/api/states/${countryCode}`);
    console.log(response);
    return response.data.map(state => ({
        name: state.state_name,
        code: state.state_code
    }));
};

module.exports = {
    getCountries,
    getStatesByCountry
};
