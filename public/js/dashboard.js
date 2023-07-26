const socket = io();
const idContainer = document.getElementById("device-id");
const deviceID = idContainer.getAttribute("data-id");
const shortDeviceId = document.getElementById("deviceId").getAttribute("data-id");

const firstFeedContainer = document.getElementById("first-feed");
const secondFeedContainer = document.getElementById("second-feed");
const tempContainer = document.getElementById("temp");
const humdContainer = document.getElementById("humd");
const drinkContainer = document.getElementById("drink");
const foodContainer = document.getElementById("food");
const uvContainer = document.getElementById("uv");


const detailLoader = (data) => {
    const schedule1 = data.schedule1 !== null ? data.schedule1 : '08:00';
    const schedule2 = data.schedule2 !== null ? data.schedule2 : '16:00';

    firstFeedContainer.textContent = formatTime(schedule1);
    secondFeedContainer.textContent = formatTime(schedule2);
    tempContainer.textContent = `${data.temp}\xB0C`;
    humdContainer.textContent = data.humd + "%";
    drinkContainer.textContent = data.drink ? 'Available' : 'Unavailable';
    foodContainer.textContent = data.food ? 'Available' : 'Unavailable';
    uvContainer.textContent = data.uv ? 'ON' : 'OFF';
};


socket.on(`mqtt-data/${deviceID}`, (data) => {
    console.log('Received MQTT data:', data);
    // do something with the data
    tempContainer.textContent = data.temp !== null ? `${data.temp}\xB0C` : '0\xB0C';
    humdContainer.textContent = data.humd !== null ? `${data.humd}%` : '0%';
    drinkContainer.textContent = data.drink ? 'Available' : 'Unavailable';
    foodContainer.textContent = data.food ? 'Available' : 'Unavailable';
    uvContainer.textContent = data.uv ? 'ON' : 'OFF';

});

generalDataLoader({ url: `/device/detail/${deviceID}`, func: detailLoader });

idContainer.addEventListener("blur", async function () {

    const resp = await httpRequest({
        url: `/device/rename/${shortDeviceId}`, method: "PUT", body: {
            "deviceName": idContainer.textContent
        }
    });
    if (resp.success) {
        alert("Success update device name");
    }
    if (!resp.success) {
        alert("Failed update device name");
    }
}, false);

function formatTime(timeStr) {
    let [hours, minutes] = timeStr.split(":");
    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}