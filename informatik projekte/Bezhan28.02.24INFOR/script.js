function updateDateTime() {
    var now = new Date();
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();

    var dateTimeString = "Aktuelles Datum: " + date + "<br>" + "Aktuelle Uhrzeit: " + time;

    document.getElementById("datetime").innerHTML = dateTimeString;
}


setInterval(updateDateTime, 1000);