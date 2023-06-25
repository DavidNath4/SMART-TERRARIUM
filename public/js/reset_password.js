const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const buttonReset = document.getElementById("reset-button");

const token = window.location.href.split('/').at(-1);

buttonReset.addEventListener("click", async () => {
    const response = await httpRequest({
        url: "/user/reset-password",
        method: "POST",
        body: {
            "password": password.value,
            "confirmPassword": confirmPassword.value,
            "token": token
        }
    });
    if (response.success) {
        alert('Success reset password!');
        window.location = "/";
    }

    if (!response.success) {
        alert('Fail reset password!');
        console.log(response);
    }

});