/**
 Fungsi untuk mengabstraksi proses pengiriman data ke server  
 */
async function httpRequest({ url, body = null, method = "POST" }) {
    let response;
    if (body) {
        response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method,
            body: JSON.stringify(body),
        });
    }

    if (!body) {
        response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method,
        });
    }

    const data = await response.json();
    return data;
}

/**
 Fungsi untuk mengabstraksi proses pengambilan data dari server untuk dimasukan ke dalam UI
 */
async function generalDataLoader({ url, func }) {
    const data = await httpRequest({ url, method: "GET" });

    if (data.success) {
        func(data.data);
    }

    if (!data.success) {
        console.log(data);
        alert('Data not found!');
    }
}

function lastCursorFinder(containerClass, attrName) {
    const container = document.querySelectorAll(`.${containerClass}`);
    const lastCursor = container[container.length - 1].getAttribute(attrName);
    return lastCursor;
}
