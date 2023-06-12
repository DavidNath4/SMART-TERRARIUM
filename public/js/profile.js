// Mengambil elemen form username, email
const username = document.getElementById("username");
const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const button = document.getElementById("save");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Fungsi untuk memasukan data dari server ke UI
const loadProfilData = (data) => {
    username.value = data.username;
    email.value = data.email;
    fullname.value = data.profile.fullName;
};
// Mengambil Data Dari Server
// module from /js/util/httpRequest.js
generalDataLoader({ url: "/user/session", func: loadProfilData });

button.addEventListener("click", async (e) => {
    // e.preventDefault();  
    // username.dissable = false;
    if (String(password.value).length > 0) {
        const resp = await httpRequest({
            url: "/user/update", body: {
                username: username.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                fullName: fullname.value
            }
        });

        if (resp.success) {
            alert("Succes update user profile");
        }

        if (!resp.success) {
            alert(resp?.data?.errors || resp?.errors || "Failed to update profile");
        }
    }

    if (String(password.value).length == 0) {
        // Hanya update username, profil dan email
        const resp = await httpRequest({
            url: "/user/updateOnly", body: {
                username: username.value,
                email: email.value,
                fullName: fullname.value
            }
        });

        if (resp.success) {
            alert("Succes update user profile");
        }

        if (!resp.success) {
            alert(resp?.data?.errors || resp?.errors || "Failed to update profile");
        }
    }



});