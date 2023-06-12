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
    firstFeedContainer.textContent = data.schedule1;
    secondFeedContainer.textContent = data.schedule2;
    tempContainer.textContent = `${data.temp}\xB0C`;
    humdContainer.textContent = data.humd + "%";
    drinkContainer.textContent = data.drink ? 'Available' : 'Unavailable';
    foodContainer.textContent = data.food ? 'Available' : 'Unavailable';
    uvContainer.textContent = data.uv ? 'ON' : 'OFF';
};


socket.on(`mqtt-data/${deviceID}`, (data) => {
    console.log('Received MQTT data:', data);
    // do something with the data
    tempContainer.textContent = `${data.temp}\xB0C`;
    humdContainer.textContent = data.humd + "%";
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