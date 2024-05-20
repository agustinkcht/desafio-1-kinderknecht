async function printCart() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    console.log(online)
    if (online.statusCode === 200) {
        template = `
        <a class="nav-link" href="/pages/cart.html" id="cart-icon">Cart</a>
        `;
        document.querySelector('#print-cart').innerHTML = template;
    };
};
async function printLogout() {
    let template = "";
    let online = await fetch('/api/sessions/online');
    online = await online.json();
    if (online.statusCode === 200) {
        template = `
        <button type="button" id="logout-btn">Log Out</button>
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
            };
        };
    };
};

export { printCart, printLogout };

