let db;

const request = indexedDB.open("WeatherDB", 1);

request.onerror = () => {
  console.error(
    "Błąd podczas otwierania bazy danych, skontaktuj się z administratorem"
  );
};

request.onsuccess = () => {
  db = request.result;
  showWeather();
};

request.onupgradeneeded = (e) => {
  const db = e.target.result;
  db.createObjectStore("weather", { autoIncrement: true });
};

document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const day = this.day.value;
  const temperature = this.temperature.value;
  const weatherDesc = this.weatherDesc.value;

  const tx = db.transaction("weather", "readwrite");
  const store = tx.objectStore("weather");
  store.add({ day, temperature, weatherDesc });

  tx.oncomplete = () => {
    alert("Dodano zapis pogodowy");
    this.reset();
    showWeather();
  };
});

function showWeather() {
  const weatherList = document.getElementById("weatherList");
  const emptyWeatherList = document.getElementById("emptyWeatherList");
  weatherList.innerHTML = "";
  emptyWeatherList.textContent = "";

  const tx = db.transaction("weather", "readonly");
  const store = tx.objectStore("weather");
  const request = store.openCursor();

  let foundAny = false;

  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      foundAny = true;
      const { day, temperature, weatherDesc } = cursor.value;
      const li = document.createElement("li");
      li.innerHTML = `Dzien: ${day}<br>Temperatura: ${temperature}<br>Opis pogody: ${weatherDesc}`;
      weatherList.appendChild(li);
      cursor.continue();
    } else {
      if (!foundAny) {
        emptyWeatherList.textContent = "BRAK DANYCH";
      }
    }
  };
}
