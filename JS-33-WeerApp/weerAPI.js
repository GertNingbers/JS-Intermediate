const url = "https://api.openweathermap.org/data/2.5/forecast?lat=52.55&lon=6.08&appid=cd782835c208f923c3e532900c7ea7c4";
let stadnaam = document.getElementById("stadnaam");
let stadurl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

let weerdata = "";



async function getWeer() {
    weerdata = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Json van de API: ", data);
            weerdata = data;
             displayWeer(weerdata);
        })
}

function displayWeer(weer) {
      var tabel = "<table><tr><th>Datum</th><th>Tijd</th><th>Tempratuur</th><th>Vochtigheid</th><th>Druk</th><th colspan='2'>Bewolking</th><th>wind</th><th>Windrichting</th></tr>"

      for (var i = 0; i < 5; i++) {
           tabel += "<tr><td colspan='2'>" + weer.list[i].dt_txt + "</td>";
           let celsius = Math.floor(weer.list[i].main.temp - 273.15);
           tabel += "<td>C°" + celsius + "</td>";
           tabel += "<td>" + weer.list[i].main.humidity + "%</td>";
           tabel += "<td>" + weer.list[i].main.pressure + " hPa</td>";
           tabel += "<td>" + weer.list[i].weather[0].main + "</td>";
           tabel += "<td> <img src='https://openweathermap.org/img/wn/" + weer.list[i].weather[0].icon + "@2x.png' alt='img of " + weer.list[i].weather[0].description + "'m/s</td>";
           tabel += "<td >" + weer.list[i].wind.speed + " m/s</td>";
           tabel += "<td>" + windpijl(weer.list[i].wind.deg) + "</td></tr>";


      }
      tabel += "</table>";
      document.getElementById('display').innerHTML = "<h3>Het weer in " + weer.city.name + ".</h3>" + tabel;
}

function windpijl(deg) {
       const img = document.createElement('img');

    img.src = 'img/pijl.png'; 
    img.style.transform = `rotate(${deg}deg)`; 
    img.style.transition = 'transform 0.5s'; 
    return img.outerHTML; 
}



getWeer()
