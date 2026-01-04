function sendWhatsApp() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();
  var branch = document.getElementById("branch").value;

  if (!name || !phone || !address) {
    alert("దయచేసి అన్ని వివరాలు నమోదు చేయండి");
    return;
  }

  var adminNumber = "9182900422";

  var message =
    "🛒 *New Biryani Order*%0A%0A" +
    "👤 Name: " + name + "%0A" +
    "📞 Phone: " + phone + "%0A" +
    "🏠 Address: " + address + "%0A" +
    "📍 Branch: " + branch;

  window.open("https://wa.me/" + adminNumber + "?text=" + message, "_blank");
}

function updateMap() {
  var branch = document.getElementById("branch").value;
  var map = document.getElementById("mapFrame");

  if (branch === "Hyderabad") {
    map.src = "https://www.google.com/maps?q=Hyderabad&output=embed";
  } 
  else if (branch === "Devarajugattu") {
    map.src = "https://www.google.com/maps?q=Devarajugattu&output=embed";
  } 
  else if (branch === "Markapuram") {
    map.src = "https://www.google.com/maps?q=Markapuram&output=embed";
  }
}
