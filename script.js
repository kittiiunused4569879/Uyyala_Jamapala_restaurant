function sendWhatsApp() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();
  var branch = document.getElementById("branch").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  var message =
    "New Order%0A" +
    "Name: " + name + "%0A" +
    "Phone: " + phone + "%0A" +
    "Address: " + address + "%0A" +
    "Branch: " + branch;

  window.open("https://wa.me/9182900422?text=" + message, "_blank");
}

function updateMap() {
  var map = document.getElementById("mapFrame");
  var branch = document.getElementById("branch").value;

  if (branch === "Devarajugattu") {
    map.src = "https://www.google.com/maps?q=Devarajugattu,Andhra%20Pradesh&output=embed";
  } else {
    map.src = "https://www.google.com/maps?q=Markapuram,Andhra%20Pradesh&output=embed";
  }
}
