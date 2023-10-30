const d = new Date();
let diff = d.getTimezoneOffset();
let long;
let latt;
let temp = 29.2;
let city = document.querySelector(".city");
const maintemp = document.querySelector(".temp");
console.log(diff);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    nolocation();
  }
}

function showPosition(position) {
  long = position.coords.longitude;
  latt = position.coords.latitude;

  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latt}&lon=${long}`
  )
    .then((res) => res.json())
    .then((data) => {
      const cityName =
        data.address.city ||
        data.address.village ||
        data.address.town ||
        data.address.municipality ||
        "Unknown City";
      city.innerHTML = cityName;
    });

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latt}&longitude=${long}&current=temperature_2m,relativehumidity_2m,is_day,precipitation,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max&timezone=Asia/Kolkata&forecast_days=3`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (i = 0; i <= data.daily.weathercode.length; i++) {
        if (data.daily.weathercode[i] == 0) {
          document.querySelector(`.day${i}sum`).innerHTML = "Clear";
        } else if (
          data.daily.weathercode[i] >= 1 &&
          data.daily.weathercode[i] < 49
        ) {
          document.querySelector(`.day${i}sum`).innerHTML = "Clouds";
        } else if (
          data.daily.weathercode[i] > 50 &&
          data.daily.weathercode[i] <= 67
        ) {
          document.querySelector(`.day${i}sum`).innerHTML = "rain";
        } else if (
          data.daily.weathercode[i] > 70 &&
          data.daily.weathercode[i] < 78
        ) {
          document.querySelector(`.day${i}sum`).innerHTML = "snow";
        } else if (
          data.daily.weathercode[i] < 100 &&
          data.daily.weathercode[i] > 79
        ) {
          document.querySelector(`.day${i}sum`).innerHTML = "thunderstrom";
        }
      }

      

      if (data.current.weathercode == 0 && data.current.is_day == 1) {
        document.querySelector(`.currentsum`).innerHTML = "Clear";
        document.querySelector(".mainIcon").src = "sun.svg";
      } else if (data.current.weathercode == 0 && data.current.is_day == 0) {
        document.querySelector(`.currentsum`).innerHTML = "Clear";
        document.querySelector(".mainIcon").src = "moon.svg";
      } else if (
        data.current.weathercode >= 1 &&
        data.current.weathercode < 49
      ) {
        document.querySelector(`.currentsum`).innerHTML = "Clouds";
        document.querySelector(".mainIcon").src = "clouds.svg";
      } else if (
        data.current.weathercode > 50 &&
        data.current.weathercode <= 67
      ) {
        document.querySelector(`.currentsum`).innerHTML = "rain";
        document.querySelector(".mainIcon").src = "rain.svg";
      } else if (
        data.current.weathercode > 70 &&
        data.current.weathercode < 78
      ) {
        document.querySelector(`.currentsum`).innerHTML = "snow";
        document.querySelector(".mainIcon").src = "snow.svg";
      } else if (
        data.current.weathercode < 100 &&
        data.current.weathercode > 79
      ) {
        document.querySelector(`.currentsum`).innerHTML = "thunderstrom";
        document.querySelector(".mainIcon").src = "thunder.svg";
      }

      document.querySelector(".temp").innerHTML = data.current.temperature_2m;
      document.querySelector(".wind").innerHTML =
        data.current.windspeed_10m + "km/h";
      document.querySelector(".precip").innerHTML =
        data.current.precipitation + "mm";
      document.querySelector(".humidity").innerHTML =
        data.current.relativehumidity_2m + "%";
      document.querySelector(".day1temp").innerHTML =
        data.daily.temperature_2m_max[0] + "°C";
      document.querySelector(".day2temp").innerHTML =
        data.daily.temperature_2m_max[1] + "°C";
      document.querySelector(".day3temp").innerHTML =
        data.daily.temperature_2m_max[2] + "°C";
      console.log(data);
      console.log(data.current.weathercode);
    });
}

function nolocation() {
  document.querySelector(".nolocation").style.display = "block";
  document.querySelector(".MainContainer").style.display = "none";
}

getLocation();
