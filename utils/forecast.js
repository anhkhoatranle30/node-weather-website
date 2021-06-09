const request = require("request");

const forecast = (long, lat, callback) => {
  long = encodeURIComponent(long);
  lat = encodeURIComponent(lat);
  const url = `http://api.weatherstack.com/current?access_key=02253283a41146984b89a6468bb5cf17&query=${lat},${long}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect the forecast API.", undefined);
    } else if (body.error) {
      callback("Invalid location", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions}. It is ${data.temperature} degrees. But it feels like ${data.feelslike} degrees out there.`
      );
    }
  });
};

module.exports = forecast;
