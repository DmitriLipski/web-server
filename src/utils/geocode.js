const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2FwdGFpbmhvcGUiLCJhIjoiY2p0d3FwMnpmMTRzYjN5bXNicWh3MjJlaCJ9.nuMMzVnnGuQpnKDKhMeWdA&limit=1`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', null)
        } else if (response.statusCode === 404) {
            callback('Unable to find location. Try another search.', null)
        } else {
            const { body } = response;
            const { features } = body;
            callback(null, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
};

module.exports = geocode;