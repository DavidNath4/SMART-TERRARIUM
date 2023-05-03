// INFO: Tampilkan data perangkat user
// Mengambil elemen container untuk daftar perangkat terrarium
const terrariumContainer = document.getElementById("pair2");

const unpair = async (id) => {
    alert(id);
    const resp = await httpRequest({
        url: "/device/unpair",
        body: {
            deviceID: id
        },
    });

    if (resp.success) {
        const element = document.getElementById(`content-${id}`);
        if (element) {
            element.remove();
        }
        // document.getElementById(`content-${id}`).remove();
    }
};

// Template yang akan berisi id terrarium, template ini diambil dr hbs, dan yg di hbs di hapus
const deviceTemplate = (deviceID, device_name) => {
    return `
        <div class="terra" id="content-${deviceID}">
            <a href="/dashboard/${deviceID}">"${device_name}"</a>
            <img src="/image/Close.svg" alt="" onclick=unpair("${deviceID}")>
        </div>
    `;
};

// Fungsi yang akan digunakan untuk memasukan data dari server ke user interface
const terrariumDataLoader = (data) => {
    // Lakukan looping semua data dari response server
    data.forEach((d) => {
        // Masukan data tersebut ke dalam container
        console.log(d.deviceName);
        terrariumContainer.insertAdjacentHTML(
            "beforeend",
            deviceTemplate(d.deviceID, d.deviceName)
        );
    });
};

// Lakukan request ke server untuk meminta data perangkat terrarium milik user
// general loader, fungsi diambil dr modul /util/httpRequest.js
generalDataLoader({ url: "/device/user-devices", func: terrariumDataLoader });

// INFO: Pairing Perangkat
// Mengambil elemen form & button berdasarkan id
const deviceIdForm = document.getElementById("device-id");
const devicePinForm = document.getElementById("device-pin");
const pairButton = document.getElementById("pair-button");

// Menambahkan event ketika tombol pair ditekan
pairButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // Mengambil nilai input form
    const deviceIdValue = deviceIdForm.value;
    const devicePinValue = devicePinForm.value;
    // Kirim data ke server
    // module from /js/util/httpRequest.js
    const resp = await httpRequest({
        url: "/device/pair",
        body: {
            deviceID: deviceIdValue,
            devicePIN: devicePinValue,
        },
    });

    // Jika Berhasil Maka masukan data baru ke dalam container
    if (resp.success) {
        terrariumContainer.insertAdjacentHTML(
            "beforeend",
            deviceTemplate(resp.data.deviceID, resp.data.deviceName)
        );
    }

    // Jika gagal maka tampilkan pesan error melalui alert
    if (!resp.success) {
        alert(resp?.msg || resp?.message);
    }
});
