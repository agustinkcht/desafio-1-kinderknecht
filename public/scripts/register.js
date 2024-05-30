import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()

document.querySelector('#register').addEventListener('click', async () => {
    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        role: document.querySelector('#role').value,
        photo: document.querySelector('#photo').value
        //agregar age, name y last name
    };
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    let response = await fetch('/api/sessions/register', opts);
    response = await response.json();
    console.log(response);
    if (response.statusCode === 201) {
        location.replace('/')
    };
    return alert(response.message);
});

