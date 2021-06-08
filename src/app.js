const path = require("path");
const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");

const express = require("express");
const hbs = require("hbs");

const app = express();

// port
const port = process.env.PORT || 3000;

//Define path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Khoa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Khoa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "If you need any help please contact me",
    title: "Help",
    name: "Khoa",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide an address",
    });
  }

  const address = req.query.address;

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecastData,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

// wildcard
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    msg: "404 help article not found!",
    name: "Khoa",
  });
});
// 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    msg: "page not found!",
    name: "Khoa",
  });
});

app.listen(port, () => {
  console.log("Server is up on : " + port);
});
