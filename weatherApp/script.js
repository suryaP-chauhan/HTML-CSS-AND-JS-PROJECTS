const button = document.getElementById("button");

button.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const cityname = city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=266afb094dc8d94107c7af7b5aee7163`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const temperatureInKelvin = data.main.temp;
      const temperatureInCelsius = temperatureInKelvin - 273.15;
      const weather = data.weather[0].description;

      document.getElementById('temp').textContent = `Temperature: ${temperatureInCelsius.toFixed(2)}°C`;
      document.getElementById('desc').textContent = `Weather: ${weather}`;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById('temp').textContent = `Error fetching weather data!`;
      document.getElementById('desc').textContent = '';
    });
});
