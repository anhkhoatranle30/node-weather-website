const request = require("request");

const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5oa2hvYXRyYW5sZTMwIiwiYSI6ImNrcGZrZHh3bDF3bjUycGxhcmltYXF3YnMifQ.ipb41EN1x660Yw2rYp2S-g&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect mapbox", undefined);
    } else if (body.features.length === 0) {
      callback("No matching result", undefined);
    } else {
      const coordinates = body.features[0].geometry.coordinates;
      callback(undefined, {
        latitude: coordinates[1],
        longitude: coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
