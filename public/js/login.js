// Mengambil elemen form & button berdasarkan id
const usernameForm = document.getElementById("username");
const passwordForm = document.getElementById("password");
const loginButton = document.getElementById("login-button");

// Menambahkan event ketika tombol login ditekan
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // Mengambil nilai input form
    const usernameValue = usernameForm.value;
    const passwordValue = passwordForm.value;
    // Kirim data ke server
    // module from /js/util/httpRequest.js
    const resp = await httpRequest({
        url: "/user/login",
        body: {
            emailOrUsername: usernameValue,
            password: passwordValue,
        },
    });
    console.log(resp);

    // Jika Berhasil Maka redirect user ke halaman beranda
    if (resp.success) {
        window.location = "/";
    }

    // Jika gagal maka tampilkan pesan error melalui alert
    if (!resp.success) {
        alert(resp.msg);
    }
});
