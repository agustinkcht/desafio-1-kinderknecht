async function printLogin() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    if (online.statusCode === 401) {
        template = `
        <a class="nav-link" href="/pages/login.html">Login</a>
        `;
        document.querySelector('#print-login').innerHTML = template;
    };
};

async function printRegister() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    if (online.statusCode === 401) {
        template = `
        <a class="nav-link" href="/pages/register.html">Register</a>
        `;
        document.querySelector('#print-register').innerHTML = template;
    };
};

async function printCart() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    console.log(online) // acá surge el online/offline que se consologuea
    if (online.statusCode === 200) {
        template = `
        <a class="nav-link" href="/pages/cart.html" id="cart-icon">Cart</a>
        `;
        document.querySelector('#print-cart').innerHTML = template;
    };
};

async function printProfile() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    if (online.statusCode === 200) {
        template = `
        <a class="nav-link" href="/pages/user.html">Profile</a>
        `;
        document.querySelector('#print-profile').innerHTML = template;
    };
};

async function printLogout() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    if (online.statusCode === 200) {
        template = `
        <button class="nav-link" type="button" id="logout-btn" style="border: solid 1px; border-radius: 4px; padding: 2px; margin-left: 4px;">Log Out</button>
        `;
        document.querySelector('#print-logout').innerHTML = template;
        document.querySelector('#logout-btn').onclick = async () => {
            const opts = {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            };
            let response = await fetch('/api/sessions/logout', opts);
            response = await response.json()
            if (response.statusCode === 200) {
                location.replace('/')
                return alert(response.message);
            };
        };
    };
};

export { printRegister, printLogin, printCart, printProfile, printLogout };

