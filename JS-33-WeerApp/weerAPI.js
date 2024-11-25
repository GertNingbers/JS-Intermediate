let stadnaam = document.getElementById("plaats");

function getStadData() {
    stadurl = "http://api.openweathermap.org/geo/1.0/direct?q=" + stadnaam.value + "&limit=1&appid=cd782835c208f923c3e532900c7ea7c4";
    let foutmelding = document.getElementById("foutmelding");
    foutmelding.innerHTML = "";
    foutmelding.style = "";

    fetch(stadurl)
        .then(response => response.json())
        .then(data => {
            console.log("stad naam json: ", data);
            stad = data;
            let citynaam = data[0].name;
            getWeer(stad, citynaam);
        })
        .catch(error => {
            foutmelding.innerHTML = "Geen geldige invoer!!!";
            foutmelding.style.color = "red";
            foutmelding.style.background = "white";
            foutmelding.style.border = "10px solid darkblue";
            foutmelding.style.borderRadius = "20px";
            foutmelding.style.padding = "10px";
            console.error('Error:', error)
        });
}


let weerdata = "";
async function getWeer(stad, citynaam) {
    weerdata = "";
    url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + stad[0].lat + "&lon=" + stad[0].lon + "&appid=cd782835c208f923c3e532900c7ea7c4";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Json van de API: ", data);
            weerdata = data;
            displayWeer(weerdata, citynaam);
        })
}

async function displayWeer(weer, citynaam) {
    var tabel = "<table><tr><th>Datum</th><th>Tijd</th><th>Tempratuur</th><th>Vochtigheid</th><th>Druk</th><th colspan='2'>Bewolking</th><th>wind Snelheid</th><th>Windrichting</th></tr>"

    for (var i = 0; i < 5; i++) {
        tabel += "<tr><td colspan='2'>" + weer.list[i].dt_txt + "</td>";
        let celsius = Math.floor(weer.list[i].main.temp - 273.15);
        tabel += "<td>" + celsius + " C°</td>";
        tabel += "<td>" + weer.list[i].main.humidity + "%</td>";
        tabel += "<td>" + weer.list[i].main.pressure + " hPa</td>";
        tabel += "<td>" + weer.list[i].weather[0].description + "</td>";
        tabel += "<td> <img src='https://openweathermap.org/img/wn/" + weer.list[i].weather[0].icon + "@2x.png' alt='img of " + weer.list[i].weather[0].description + "'m/s</td>";
        tabel += "<td >" + weer.list[i].wind.speed + " m/s</td>";
        tabel += "<td>" + windpijl(weer.list[i].wind.deg) + "</td></tr>";


    }
    tabel += "</table>";
    let landnaam = await getland(weer.city.country);
    document.getElementById('display').innerHTML = "<h3>Het weer in " + citynaam + " in " + landnaam + "</h3>" + tabel;
}

function windpijl(deg) {
    const img = document.createElement('img');

    img.src = 'img/pijl.png';
    img.style.transform = `rotate(${deg}deg)`;
    return img.outerHTML;
}

async function getland(afkorting) {
    let landurl = 'https://restcountries.com/v3.1/alpha/' + afkorting;
    const response = await fetch(landurl);
    const data = await response.json();
    console.log("Landen API", data);
    return data[0].translations.nld.common;
}


getStadData()
