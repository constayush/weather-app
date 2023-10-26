
let main

fetch("https://api.open-meteo.com/v1/forecast?latitude=28.37&longitude=79.43&current=temperature_2m,relativehumidity_2m,is_day,precipitation,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max&timezone=Asia/Kolkata&forecast_days=3").then((res)=>{return res.json()}).then((data)=>{ document.querySelector('.temp').innerHTML =  data.current.temperature_2m
document.querySelector('.wind').innerHTML =  data.current.windspeed_10m + 'km/h'
document.querySelector('.precip').innerHTML =  data.current.precipitation + 'mm'
document.querySelector('.humidity').innerHTML =  data.current.relativehumidity_2m + '%'
document.querySelector('.rain').innerHTML =  data.current.rain + "mm"
document.querySelector('.day1temp').innerHTML =  data.daily.temperature_2m_max[0] + "°C"
document.querySelector('.day2temp').innerHTML =  data.daily.temperature_2m_max[1] + "°C"
document.querySelector('.day3temp').innerHTML =  data.daily.temperature_2m_max[2] + "°C"
console.log(data)
})

