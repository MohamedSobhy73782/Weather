

let searchInput = document.querySelector("#searchInput");
let btn = document.querySelector("#btn");

if (sessionStorage.getItem("city") == null) {
  getData("egypt");
} else {
  getData(JSON.parse(sessionStorage.getItem("city")));
}

function local(key) {
  sessionStorage.setItem("city", JSON.stringify(key));
}

btn.addEventListener("click", function () {
  local(searchInput.value)
  getData(searchInput.value)
})


async function getData(key) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4ce904f1f4d24181b3314622232912&q=${key}&days=4`
  );
  let rus = await data.json();
  display(rus);
}

function display(obj) {
  let cartona = `
<div class="col-lg-4 col-md-6 p-lg-0" >
            <div class="first-box">
              <div class="header d-flex justify-content-between">
                <h3 class="day">${new Date(
                  obj.forecast.forecastday[1].date
                ).toLocaleDateString("en", { weekday: "long" })}</h3>
                <h3 class="data">${
                  new Date(obj.location.localtime).toLocaleDateString("en", {
                    day: "2-digit",
                  }) +
                  new Date(obj.location.localtime).toLocaleDateString("en", {
                    month: "long",
                  })
                }</h3>
              </div>
              <div class="body">
                <h3>${obj.location.name}</h3>
                <div class="dagree d-flex">
                  <h4>${obj.current.temp_c}<sup>o</sup>C</h4>
                  <div class="img">
                    <img src=${obj.current.condition.icon} alt="">
                  </div>
                </div>
                <p>${obj.current.condition.text}</p>
                <span><img src="img/icon-umberella.png" alt="">${
                  obj.current.wind_degree
                }%</span>
        <span><img src="img/icon-wind.png" alt="">${
          obj.current.wind_kph
        }km/h</span>
        <span><img src="img/icon-compass.png" alt="">${
          obj.current.wind_dir
        }</span>
              </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 p-lg-0">
          <div class="second-box text-center">
            <div class="header">
              <h3>${new Date(
                obj.forecast.forecastday[2].date
              ).toLocaleDateString("en", {
                weekday: "long",
              })}</h3>
            </div>
            <div class="body">
              <img src=${obj.forecast.forecastday[2].day.condition.icon} alt="">
              <h4>${obj.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h4>
              <small>${
                obj.forecast.forecastday[2].day.mintemp_c
              }<sup>o</sup></small>
              <p>${obj.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 p-lg-0">
          <div class="last-box text-center">
            <div class="header">
              <h3>${new Date(
                obj.forecast.forecastday[3].date
              ).toLocaleDateString("en", {
                weekday: "long",
              })}</h3>
            </div>
            <div class="body">
              <img src=${obj.forecast.forecastday[3].day.condition.icon} alt="">
              <h4>${obj.forecast.forecastday[3].day.maxtemp_c}<sup>o</sup>C</h4>
              <small>${
                obj.forecast.forecastday[3].day.mintemp_c
              }<sup>o</sup></small>
              <p>${obj.forecast.forecastday[3].day.condition.text}</p>
            </div>
          </div>
        </div>
  `;
  document.querySelector("#display").innerHTML = cartona;
}