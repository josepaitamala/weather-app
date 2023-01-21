const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5101812dcd6b5537a0199f63852c4ceb&query='+latitude+','+longitude;

    request( { url, json: true}, (error,response, body) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error) {
            callback(body.error.info, undefined);
        }
        else {
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} Celsius degrees and it feels like ${body.current.feelslike} Celsius degrees.`);
        }
    });
}

module.exports = forecast;