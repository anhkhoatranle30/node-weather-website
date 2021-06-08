console.log("Client side");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then(({ error, location, forecastData, address }) => {
      if (error) {
        messageOne.textContent = error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = `Location : ${location}`;
        messageTwo.textContent = `Forecast : ${forecastData}`;
      }
    });
  });

  console.log(location);
});
