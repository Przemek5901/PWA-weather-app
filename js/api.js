const apiKey = CONFIG.OPENWEATHER_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=50.29&lon=18.95&&units=metric&appid=${apiKey}`;

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("apiData").innerHTML = `
      Pogoda w ${data.name}: ${data.main.temp}°C, <br>
      Opis pogody w języku angielskim: ${data.weather[0].description} <br>
      Prędkość wiatru: ${data.wind.speed}, <br>
      Wschód słońca: ${unixToHour(data.sys.sunrise)}, <br>
      Zachód słońca: ${unixToHour(data.sys.sunset)}
    `;
  })
  .catch(() => {
    document.getElementById("apiData").innerText =
      "Nie udało się pobrać danych.";
  });

function unixToHour(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
