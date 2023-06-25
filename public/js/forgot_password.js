const emailForm = document.getElementById("email");
const button = document.getElementById("reset");

button.addEventListener("click", async () => {
    const response = await httpRequest({
        url: "/user/forgot-password",
        method: "POST",
        body: {
            "email": emailForm.value,
        }
    });
    if (response.success) {
        alert('Success sending reset email!');
    }

    if (!response.success) {
        alert('Faill sending reset email!');
    }

});