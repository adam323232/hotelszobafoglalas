// Ez a fájl tartalmazza az admin felület JavaScript kódját

function showTab(tabId) {
  // Minden tab elrejtése
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });

  // Az aktuális tab megjelenítése
  document.getElementById(tabId).style.display = "block";

  // Ha a "Szobák" tabot választjuk, betöltjük az adatokat
  if (tabId === "szobak") {
    loadRooms();
  }

  // Ha a "Szoba hozzáadása" tabot választjuk, betöltjük az űrlapot
  if (tabId === "addroom") {
    loadAddRoom();
  }

  if (tabId === "users") {
    loadUsers();
  }
}
function loadAddRoom() {
  // AJAX hívás a SzobaHozzadasa.ejs betöltéséhez
  fetch("/admin/addroom")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("addroom").innerHTML = data;
    })
    .catch((error) => console.error("Error loading add room form:", error));
}

function loadRooms() {
  // Ha a Szobák tabot választjuk, AJAX hívással töltjük be a szobák adatokat
  fetch("/admin/rooms")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("szobak").innerHTML = data;
      console.log(data);
    })
    .catch((error) => console.error("Error loading rooms:", error));
}

function loadUsers() {
  // AJAX hívás a Users.ejs betöltéséhez
  fetch("/admin/users")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("users").innerHTML = data;
    })
    .catch((error) => console.error("Error loading users:", error));
}
async function foglalastorol(id) {
  const response = await fetch(`/api/bookings/torol/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
function usertorol(id) {
  if (confirm("Biztosan törölni szeretnéd ezt a felhasználót?")) {
    fetch(`/api/users/torol/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Felhasználó sikeresen törölve!");
          window.location.reload(); // Az oldal frissítése
        } else {
          alert("Hiba történt a törlés során!");
        }
      })
      .catch((error) => {
        console.error("Hiba:", error);
        alert("Hiba történt a törlés során!");
      });
  }
}

async function szobahozzaad() {
  const formData = {
    name: document.getElementById("name").value,
    rentperday: document.getElementById("rentperday").value,
    maxcount: document.getElementById("maxcount").value,
    description: document.getElementById("description").value,
    phonenumber: document.getElementById("phonenumber").value,
    type: document.getElementById("type").value,
    extrak: [
      document.getElementById("szobaszerviz").checked,
      document.getElementById("minibar").checked,
      document.getElementById("fitneszterem").checked,
      document.getElementById("parkolo").checked,
      document.getElementById("etkezes").checked,
      document.getElementById("wifi").checked,
    ],
    imageurls: [
      document.getElementById("imageurl1").value,
      document.getElementById("imageurl2").value,
      document.getElementById("imageurl3").value,
      document.getElementById("imageurl4").value,
      document.getElementById("imageurl5").value,
    ],
  };

  const response = await fetch("/api/rooms/addroom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert("Szoba sikeresen hozzáadva!");
    window.location.reload();
  } else {
    alert("Hiba történt a szoba hozzáadása során!");
  }
}

async function szobafrissites(id, updatedRoom) {
  const response = await fetch(`/api/rooms/updatebooking/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedRoom }),
  });
  if (response.ok) {
    alert("Szoba sikeresen frissítve!");
    window.location.reload();
  } else {
    alert("Hiba történt a szoba frissítése során!");
  }
}
async function szobatorol(id) {
  if (confirm("Biztosan törölni szeretnéd ezt a szobát?")) {
    const response = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Szoba sikeresen törölve!");
      window.location.reload();
    } else {
      alert("Hiba történt a szoba törlése során!");
    }
  }
}
// Modális ablak megnyitása
function openModal(id, name, type, rentperday, maxcount, phonenumber, extrak) {
  console.log(extrak.split(","));
  let extrakArray = extrak.split(",");
  let tomb = [];

  for (let i = 0; i < extrakArray.length; i++) {
    if (extrakArray[i] === "true") {
      tomb.push(true);
    } else {
      tomb.push(false);
    }
  }

  document.getElementById("editModal").style.display = "block";
  document.getElementById("editRoomId").value = id;
  document.getElementById("editRoomName").value = name;
  document.getElementById("editRoomType").value = type;
  document.getElementById("editRoomRentPerDay").value = rentperday;
  document.getElementById("editRoomMaxCount").value = maxcount;
  document.getElementById("editRoomPhoneNumber").value = phonenumber;

  // Extrák checkboxok beállítása a tömb alapján
  document.getElementById("editExtraSzobaszerviz").checked = tomb[0] || false;
  document.getElementById("editExtraMinibar").checked = tomb[1] || false;
  document.getElementById("editExtraFitneszterem").checked = tomb[2] || false;
  document.getElementById("editExtraParkolo").checked = tomb[3] || false;
  document.getElementById("editExtraEtkezes").checked = tomb[4] || false;
  document.getElementById("editExtraReggeli").checked = tomb[5] || false;
  document.getElementById("editExtraWifi").checked = tomb[6] || false;
}

// Modális ablak bezárása
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// Szoba frissítése
async function updateRoom() {
  const id = document.getElementById("editRoomId").value;
  const updatedRoom = {
    name: document.getElementById("editRoomName").value,
    type: document.getElementById("editRoomType").value,
    rentperday: document.getElementById("editRoomRentPerDay").value,
    maxcount: document.getElementById("editRoomMaxCount").value,
    phonenumber: document.getElementById("editRoomPhoneNumber").value,
    extrak: [
      document.getElementById("editExtraSzobaszerviz").checked,
      document.getElementById("editExtraMinibar").checked,
      document.getElementById("editExtraFitneszterem").checked,
      document.getElementById("editExtraParkolo").checked,
      document.getElementById("editExtraEtkezes").checked,
      document.getElementById("editExtraReggeli").checked,
      document.getElementById("editExtraWifi").checked,
    ],
  };

  const response = await fetch(`/api/rooms/updatebooking/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedRoom }),
  });

  if (response.ok) {
    alert("Szoba sikeresen frissítve!");
    window.location.reload();
  } else {
    alert("Hiba történt a szoba frissítése során!");
  }
}

function toggleAdmin(id, isAdmin) {
  fetch(`/api/users/toggleAdmin/${id}`, {
    // Helyes URL
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isAdmin }), // Csak az isAdmin értéket küldjük
  })
    .then((response) => {
      if (response.ok) {
        location.reload(); // Frissítjük az oldalt a változások megjelenítéséhez
      } else {
        alert("Hiba történt az admin jog módosítása során.");
      }
    })
    .catch((error) => {
      console.error("Hiba:", error);
      alert("Hiba történt az admin jog módosítása során.");
    });
}
