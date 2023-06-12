const submitBtn = document.getElementById("submit");
const autoBtn = document.getElementById("auto");
const mode = document.getElementById("mode");
const deviceId = document.getElementById("deviceId").getAttribute("data-id");

const timeHandler = (id) => {
    const feedContainer = document.getElementById(id);
    const hourForm = feedContainer.childNodes[1].childNodes[5];
    const hourArrowUp = feedContainer.childNodes[1].childNodes[3];
    const hourArrowDown = feedContainer.childNodes[1].childNodes[7];
    hourArrowUp.addEventListener("click", e => {
        e.preventDefault();
        const nextValue = Number(hourForm.value) + 1;
        if (nextValue <= 23) {
            hourForm.value = nextValue < 10 ? `0${nextValue}` : nextValue;
        }
    });
    hourArrowDown.addEventListener("click", e => {
        e.preventDefault();
        const prevValue = Number(hourForm.value) - 1;
        if (prevValue >= 0) {
            hourForm.value = prevValue < 10 ? `0${prevValue}` : prevValue;
        }
    });

    const minutesForm = feedContainer.childNodes[5].childNodes[5];
    const minutesArrowUp = feedContainer.childNodes[5].childNodes[3];
    const minutesArrowDown = feedContainer.childNodes[5].childNodes[7];
    minutesArrowUp.addEventListener("click", e => {
        e.preventDefault();
        const nextValue = Number(minutesForm.value) + 1;
        if (nextValue <= 59) {
            minutesForm.value = nextValue < 10 ? `0${nextValue}` : nextValue;
        }
    });
    minutesArrowDown.addEventListener("click", e => {
        e.preventDefault();
        const prevValue = Number(minutesForm.value) - 1;
        if (prevValue >= 0) {
            minutesForm.value = prevValue < 10 ? `0${prevValue}` : prevValue;
        }
    });
};

const timeGeter = (id) => {
    const feedContainer = document.getElementById(id);
    const hourForm = feedContainer.childNodes[1].childNodes[5];
    const minutesForm = feedContainer.childNodes[5].childNodes[5];
    return `${hourForm.value}:${minutesForm.value}`;
};

const timeSetter = (id, time) => {
    const [hour, minutes] = String(time).split(":");
    const feedContainer = document.getElementById(id);
    const hourForm = feedContainer.childNodes[1].childNodes[5];
    const minutesForm = feedContainer.childNodes[5].childNodes[5];
    hourForm.value = Number(hour) < 10 ? `0${Number(hour)}` : hour;
    minutesForm.value = Number(minutes) < 10 ? `0${Number(minutes)}` : minutes;
};

timeHandler("firstFeed");
timeHandler("secondFeed");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const firstFeed = timeGeter("firstFeed");
    const secondFeed = timeGeter("secondFeed");
    const resp = await httpRequest({
        url: `/schedule/publish/${deviceId}`, method: "PUT", body: {
            "schedule1": firstFeed,
            "schedule2": secondFeed,
            "mode": "MANUAL"
        }
    });

    if (resp.msg) {
        alert("Success set feed schedule");
    }
    if (!resp.msg) {
        alert("Failed set feed schedule");
    }
});

autoBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const resp = await httpRequest({
        url: `/schedule/publish/${deviceId}`, method: "PUT", body: {
            "schedule1": "8:0",
            "schedule2": "16:0",
            "mode": "AUTO"
        }
    });

    if (resp.msg) {
        alert("Success set auto schedule");
    }
    if (!resp.msg) {
        alert("Failed set auto schedule");
    }
});

const detailLoader = (data) => {
    timeSetter("firstFeed", data.schedule1);
    timeSetter("secondFeed", data.schedule2);
    mode.textContent = data.isAuto;
};

generalDataLoader({ url: `/device/detail/${deviceId}`, func: detailLoader });
