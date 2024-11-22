// Bewaar de url waarop de API staat in een variabele
let url = "http://127.0.0.1/school/JS-Intermediate/JS-32b/users.json";
let urlBier = "https://std.stegion.nl/api_bier/api.php?action=getBeers";

// Algemene functie die users als parameter binnen krijgt (in JSON format), deze ineen HTML table omzet en terug geeft met een return
// Deze wordt voor de "geneste" methode en Ã©n de "async"-methode gebruikt
function fGetHtml(bier) {                  
    var htmlTable = "<table class='tblA txt_sm'>";
    htmlTable += "<tr>";                    // plaats de row met headers van de tabel
        htmlTable += "<th>NR</th>";
        htmlTable += "<th>naam</th>";
        htmlTable += "<th>gisting</th>";
        htmlTable += "<th>percentage</th>";
    htmlTable += "</tr>";
    for (var i = 0; i < bier.length; i++) { // loop door alle users plaats de row met headers van de tabel
        htmlTable += "<tr>";
            htmlTable += "<td>" + (i + 1) + "</td>";
            htmlTable += "<td>" + bier[i].naam + "</td>";   // haal van de array nr i van de users, het object key "name" op
            htmlTable += "<td>" + bier[i].gisting + "</td>";    // haal van de array nr i van de users, het object key "dob" (date of birth) op
            htmlTable += "<td>" + bier[i].perc + "</td>";  // haal van de array het email adres op
        htmlTable += "</tr>";
    }
    htmlTable += "</table>";
    return htmlTable;
}

/*   ----- start ----------- 1 "geneste" function om data op te halen, met fGetHtml() de HTML ophalen en die plaatsen op de webpagina -------- */
function getHtmlFromUrl(url) {  // haal dat van URL binnen, verwerkt dit in een HTML-table en plaatst {
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(json => {
            console.log("json = ", json);               // geef ter controle in de console de opgehaalde JSON weer. 
            console.log("bier = ", json.data);        // de json bevat users en offices, laat hier alleen de users zien 
            let htmlUsersTable = fGetHtml(json.data);  // fGetHtml geeft een variabele terug met de HTML-table, sla de op in "htmlUsersTable"
            document.getElementById("out_table1").innerHTML = htmlUsersTable;
        });
}
/*   ----- stop ------------ 1 "geneste" function om data op te halen, met fGetHtml() de HTML ophalen en die plaatsen op de webpagina -------- */



/*   ----- start ----------- 2 functions die eerst de data ophalen, wachten tot die binnen is (met aSync) ------------------------------------ */
async function fGetData (url) {  // haalt de data op van de url (API) en geeft met "return json" de data terug
    console.log("in fFetchDataAsync. url = ", url)
       return fetch(url)
        .then(data => {
            return data.json();           
        })
        .then(json => {
            console.log("Users in fFetchDataAsync:", json); // geef ter controle in de console de opgehaalde JSON weer. 
            return json
        });        
}

async function getHtmlFromUrlAsync(url) {  // is een asynchrone function (lees hieronder waarom)
    console.log("url = ", url)
    let myJson = await fGetData(url); // ophalen van fGetData() duurt even. 
    // Om te voorkomen dat het script direct naar de volgende regel doorgaat voordat de data binnen is, zeg je dat hij moet wachten op de data met "await"
    // Als je await wil gebruiken in een function moet je deze "asynchroon" maken door voor functio, "async" te zetten
    var userTable = "<table><tr><th>Nr</th><th>naam</th><th>Geboorte dag</th><th>Email</th></tr>";
    for (j=0 ; j < myJson.users.length; j++) {
        userTable += "<tr>";
        userTable += "<td>" + (j + 1) + "</td>";
        userTable += "<td>" + myJson.users[j].name + "</td>";
        userTable += "<td>" + myJson.users[j].dob + "</td>";
        userTable += "<td>" + myJson.users[j].email + "</td></tr>";
    } userTable += "</table>";
    console.log("myJson = ", myJson);
    document.getElementById("out_table2").innerHTML = userTable;
}
/*   ----- start ----------- 2 functions die eerst de data ophalen, wachten tot die binnen is (met aSync) ------------------------------------ */

// voer de "geneste" methode uit, Ã³f voor de nettere, async methode bij opstarten meteen uit (ze beschrijven beide dezelfde "out_table"-div)
getHtmlFromUrl(urlBier);        
getHtmlFromUrlAsync(url); 

import axios from 'axios';

// Voorbeeld van een GET-verzoek
axios.get(url)
  .then(response => {
    console.log(response.data); 
  })
  .catch(error => {
    console.error('Er is een fout opgetreden:', error);
  });