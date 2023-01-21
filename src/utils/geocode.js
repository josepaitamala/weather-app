const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoiam9zZXBhaXRhbWFsYSIsImEiOiJjbGNxaThmc3QwMGs1M3Btc2htZDJ6ZXk0In0.Uv0e7XikPXrfow4Gp70cmw';

    request( {url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        }
        else if (!body.features.length) {
            callback('No place found', undefined);
        }
        else {
            const latitude = body.features[0].geometry.coordinates[1];
            const longitude = body.features[0].geometry.coordinates[0];
            const location = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
}

module.exports = geocode;