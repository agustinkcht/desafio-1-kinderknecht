import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()

let role
let uid
let product
let sid
let button

const template = (product) => `
<div class="card m-2" style="width: 18rem;">
    <img src="${product.photo}" class="card-img-top" alt="product-photo">
    <div class="card-body">
        <h4 class="card-title">${product.title}</h4>
        <h5 class="card-title">$${product.price}</h4>
            <div class="d-flex flex-row justify-content-evenly">
                ${
                    button === "cart" ? `<button type="button" class="btn btn-primary" onclick="addToCart('${product._id}')">Add toCart</button>` : ''
                }
                ${
                    button === "manage" ? `<a href="/pages/manage.html?id=${product._id}" type="button" class="btn btn-primary" >Manage</a>` : ''
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

async function getProduct() { // retrieve product data
    try {
        let res = await fetch(`/api/products/${pid}`)
        res = await res.json()
        if(res.statusCode !== 200) {
            console.log("Product not found")
        } 
        product = res.response
        sid = product.supplier_id._id
    } catch (err) {
        console.error("Error fetching data")     
    }
   //function here
}

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
        if (role === 0 || (role === 2) && (uid !== sid) ) {
            return button = "cart"
        }
        // OJO! ES UID !== SUPPLIER ID NO sid
        if (role === 1 ||(role === 2) && (uid === sid) ) {
            return button = "manage"
        }
    } catch (err) {
        console.error(err)   
    }
}

async function setTemplate() {
    try {
        const productHtml = template(product)
        document.querySelector("#product").innerHTML = productHtml; 
    } catch (err) {
        console.log("Unable to print product card due to lack of information")
        
    }
    const productHtml = template(product)
    document.querySelector("#product").innerHTML = productHtml; 

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
    let getP = await getProduct()
    let setB = await setButton()
    let setT = await setTemplate()
}

window.addToCart = addToCart;