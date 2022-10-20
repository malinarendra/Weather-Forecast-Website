let weather = {
  apiKey: "0c456acbf0e6643d713d539b696c3651",
  fetchWeather: function (city_name) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city_name +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector("#city_name").innerText = "Weather in " + name;
    document.querySelector("#wether_img").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#descript").innerText = description;
    document.querySelector("#temp").innerText = temp + "°C";
    document.querySelector("#humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector("#wind_speed").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector("#searchbox").value);
  },
};

document.querySelector("#btn").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector("#searchbox")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");   
