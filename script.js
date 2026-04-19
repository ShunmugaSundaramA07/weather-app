const apiKey = "e50b47d06e143d4b94e561166e6a20f9"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.cod != 200) {
      alert("❌ " + data.message);
      return;
    }

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerText =
      data.main.humidity + "%";
    document.getElementById("wind").innerText =
      data.wind.speed + " km/h";


    const weatherMain = data.weather[0].main;
    let icon = "";

    if (weatherMain === "Clouds") {
      icon = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    } else if (weatherMain === "Clear") {
      icon = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    } else if (weatherMain === "Rain") {
      icon = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
    } else {
      icon = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
    }

    document.getElementById("icon").src = icon;

  } catch (error) {
    alert("⚠️ Error fetching data");
    console.log(error);
  }
}

document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});