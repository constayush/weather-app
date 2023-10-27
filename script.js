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
    nolocation()
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
    });
}

function nolocation() {
  document.querySelector(".nolocation").style.display = "block";
  document.querySelector(".MainContainer").style.display = "none";
}

getLocation();
