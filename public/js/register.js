// Mengambil elemen form & button berdasarkan id
const usernameForm = document.getElementById("username");
const emailForm = document.getElementById("email");
const passwordForm = document.getElementById("password");
const confirmPasswordForm = document.getElementById("confirm-password");
const registerButton = document.getElementById("register-button");

// Menambahkan event ketika tombol login ditekan
registerButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // Mengambil nilai input form
    const emailValue = emailForm.value;
    const usernameValue = usernameForm.value;
    const passwordValue = passwordForm.value;
    const confirmPasswordValue = confirmPasswordForm.value;

    // Kirim data ke server
    // module from /js/util/httpRequest.js
    const resp = await httpRequest({
        url: "/user/register",
        body: {
            username: usernameValue,
            email: emailValue,
            password: passwordValue,
            confirmPassword: confirmPasswordValue,
        },
    });
    console.log(resp);

    // Jika Berhasil Maka redirect user ke halaman beranda
    if (resp.success) {
        window.location = "/";
    }

    // Jika gagal maka tampilkan pesan error melalui alert
    if (!resp.success) {
        alert(resp?.data?.data || resp.message);
    }
});
