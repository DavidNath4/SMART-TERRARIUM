// Mengambil elemen form username, email
const username = document.getElementById("username");
const email = document.getElementById("email");

// Fungsi untuk memasukan data dari server ke UI
const loadProfilData = (data) => {
    username.value = data.username;
    email.value = data.email;
};
// Mengambil Data Dari Server
// module from /js/util/httpRequest.js
generalDataLoader({ url: "/user/session", func: loadProfilData });
