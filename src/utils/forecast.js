const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/90bca0723f568b56588333faa7d586c2/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', null)
        } else if (body.error) {
            callback('Unable to find location', null)
        } else {
            callback(null, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
};

module.exports = forecast;
