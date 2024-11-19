// url van API, in dit geval van 750 belgische biertjes
// wil je een ander API gebruiken?
//  - verander de url
//  - pas in regels 72 en 73 de namen  van de object-keys aan
var url  = "https://15euros.nl/api/bier_basic.php";

// 1)  directe AJAX call met plain Javascript
//     heeft verder geen includes van JS bibliotheken nodig: light weight!!
function fLaadBier_plainJS() {
    console.log("fLaadBier_plainJS() aangeroepen");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            bierJSON = this.responseText;
            json = JSON.parse(bierJSON);
            console.log("Bier, geladen met AJAX in plain Javascript:",json);
            fJson2Html(json, "plain Javascript"); // geef JSON en title door aan function
            //alert("Bier is met Plain Javascript in de DOM geladen (zie console)");
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// 2)  AJAX call met FETCH API van Javascript zelf, heeft verder geen include libraries nodig
//     Heeft minder script nodig dan plain JS
function fLaadBier_fetch() {
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(json => {
            console.log("Bier, geladen met AJAX via FETCH API van JS:", json);
            fJson2Html(json, "FETCH API van JS"); // geef JSON en title door aan function
        });
}

// 3)  AJAX call met jQuery bibliotheek, heeft include van jQuery bibliotheek nodig
//     alleen via jQuery doen als je verder ook jQuery in je site gebruikt, anders overkill => te grote lib voor alleen AJAX-request
function fLaadBier_jQuery() {
    $.getJSON(url, function(json){
        console.log("Bier, geladen met AJAX via jQuery ", json);
        fJson2Html(json, "jQuery AJAX request"); // geef JSON en title door aan function
    });
}

// 4)  AJAX call met Axios library, heeft include van Axios library nodig
function fLaadBier_axios() {
    axios.get(url)
        .then(function (response) {
            //console.log("\"response\" van Axios get-request: ", response); //hele response, bekijk hem: er staat meer dan alleen de data in
            let json = response.data; // de eigenschap "data" van het object "response" bevat de gevraagde json
            //console.log("Bier, geladen met AJAX via Axios ", json);
            fJson2Html(json, "Axios get request"); // geef JSON en title door aan function
        })
}

// Na het ophalen van de JSON uit de API, wordt steeds onderstaande function aangeroepen
// die de JSON naar HTML vertaald en in "out_data" zet
function fJson2Html(json, title) {
    document.getElementById("out_title").innerHTML = title;

    var table = "<table>";
    table += "<tr>";
        table += "<th>";
            table += "nr";
        table += "</th>";
        table += "<th>";
            table += "naam";
        table += "</th>";
        table += "<th>";
            table += "brouwer";
        table += "</th>";
    table += "</tr>";
    for(var i=0; i<json.length; i++) {
        table += "<tr>";
            table += "<td>" + (i+1) + "</td>";              // zet een volgorde nummer voor in de rij
            table += "<td>" + json[i].naam + "</td>";       // haal van de array nr i van de json, de object key "naam" op
            table += "<td>" + json[i].brouwer + "</td>";    // haal van de array nr i van de json, de object key "brouwer" op
        table += "</tr>";
    }
    table += "</table>";

    document.getElementById("out_title").innerHTML = title; // vul de title die meegegeven is aan de functie in "out_title" in
    document.getElementById("out_data" ).innerHTML = table; // vul "out_data" met de uit de json opgebouwe table
}

function fClear() {
    document.getElementById("out_title").innerHTML = ""; // wis inhoud
    document.getElementById("out_data" ).innerHTML = ""; // wis inhoud
}
