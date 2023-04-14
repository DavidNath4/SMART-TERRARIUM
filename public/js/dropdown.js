const dropDownBtn = document.getElementById("profile");
const dropDown = document.getElementById("drop-down-container");

dropDownBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dropDown.classList.toggle("d-none");
});
