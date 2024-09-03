import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

document.querySelector("#submit").addEventListener("click", async () => {
    const data = {
        title: document.querySelector("#title").value.trim() || undefined,
        photo: document.querySelector("#photo").value.trim() || undefined,
        category: document.querySelector("#category").value.trim() || undefined,
        price: document.querySelector("#price").value.trim() ? Number(document.querySelector("#price").value) : undefined,
        stock: document.querySelector("#price").value.trim() ? Number(document.querySelector("#price").value) : undefined
    }
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    let response = await fetch("/api/products", opts);
    response = await response.json()
    console.log(response)
    if(response.statusCode !== 201) {
        return alert(`Error creating new product. ${response.message}`)
    }
    return alert(response)
})

printOfflineIcons();
printOnlineIcons();