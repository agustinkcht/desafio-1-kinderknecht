import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()

let role
let uid
let button

const template = (data) => `
<div class="card m-2" style="width: 18rem;">
    <img src="${data.photo}" class="card-img-top" alt="data-photo">
    <div class="card-body">
        <h4 class="card-title">${data.title}</h4>
        <h5 class="card-title">$${data.price}</h4>
            <div class="d-flex flex-row justify-content-evenly">
                ${
                    button === "cart" ? `<button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Add toCart</button>` : ''
                }
                ${
                    button === "manage" ? `<button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Manage</button>` : ''
                }
                ${
                    button === "none" ? '<a href="/pages/login.html">Log in to buy</a>' : ''
                }
            </div>  
    </div>
</div> 
`;

const queries = new URL(location.href);
const pid = queries.searchParams.get('id');
// traigo pid desde el params

async function setButton() {
    try {
        let res = await fetch("/api/sessions/online")
        res = await res.json()
        if(res.statusCode !== 200) {
            console.error("Error retrieving user data")
            return button = "none"
        }
        role = res.role;
        uid = res.user_id;
        if (role === 0 || (role === 2) && (uid !== pid) ) {
            return button = "cart"
        }
        if (role === 1 ||(role === 2) && (uid === pid) ) {
            return button = "manage"
        }
    } catch (err) {
        console.error(err)   
    }
}
async function getProduct() { // retrieve product data
    try {
        let res = await fetch(`/api/products/${pid}`)
        res = await res.json()
        if(res.statusCode !== 200) {
            console.log("Product not found")
        } 
        const product = res.response
        const productHtml = template(product)
        document.querySelector("#product").innerHTML = productHtml; 
    } catch (err) {
        console.error("Error fetching data")     
    }
   //function here
}



async function addToCart(pid) {
    try {
        let fetchSession = await fetch('/api/sessions/online');
        fetchSession = await fetchSession.json();
        const user_id = fetchSession.user_id;
        // fetch a la data de la session, para obtener el user_id
        const data = {
            user_id: user_id,
            product_id: pid,
            quantity: 1 
        }; 
        const url = '/api/carts';
        const opts = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type" : "application/json"}
        };
        let response = await fetch(url, opts)
        response = await response.json()
        console.log('added to cart', response)
        alert('Added To The Cart')
    } catch (error) {
        console.log(error)
    };
};

document.addEventListener('DOMContentLoaded', () => { // execute getProduct ASAPL (page load)
    if(!pid) {
        document.querySelector("#productNotFound").innerHTML = "Product not found"
    }
    gets()
    
});

async function gets() {
    let getr = await setButton()
    let get = getProduct()
}

window.addToCart = addToCart;