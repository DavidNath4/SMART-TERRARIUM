const idContainer = document.getElementById("device-id");
const deviceID = idContainer.getAttribute("data-id");


const terrariumContainer = document.getElementById("form-container");

const deviceTemplate = (temp, date) => {
    return `
        <div class="log-container">
            <p class="value">${temp}&degC</p>
            <p class="time">${date}</p>
        </div>
    `;
};

const terrariumDataLoader = (data) => {
    // Lakukan looping semua data dari response server
    data.forEach((d) => {
        // Masukan data tersebut ke dalam container
        terrariumContainer.insertAdjacentHTML(
            "beforeend",
            deviceTemplate(d.temp, formatDate(d.createdAt))
        );

    });
};

generalDataLoader({ url: `/history/temp/${deviceID}`, func: terrariumDataLoader });

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const meridiem = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${meridiem}`;
};