const apiKey = "YOUR_API_KEY";

async function getWeather(){

const city=document.getElementById("city").value;

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);

const data=await response.json();

if(data.cod=="404"){

document.getElementById("result").innerHTML="❌ City Not Found";

return;

}

document.getElementById("result").innerHTML=`
<h2>${data.name}</h2>
<p>🌡 Temperature : ${data.main.temp}°C</p>
<p>💧 Humidity : ${data.main.humidity}%</p>
<p>🌬 Wind : ${data.wind.speed} km/h</p>
<p>☁ Weather : ${data.weather[0].main}</p>
`;

}catch{

document.getElementById("result").innerHTML="Something went wrong.";

}

}