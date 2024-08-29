import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()

// fill up the template with the data retrieved from the fetch down below
const template = (data) => `
<div class="card m-2" style="width: 25rem;">
    <div class="d-flex flex-column align-items-center">
        <a href="/pages/detail.html?id=${pid}">
        <img src="${data.photo}" class="card-img-top mt-3" style="width: 10rem;" alt="data-photo">
        </a>
    </div>
    <form class="card-body d-flex flex-column m-3">
        <h4 class="mb-1">Photo:</h4>
        <input class="mb-3 w-40" type="text" name="photo" id="photo" placeholder=${data.photo}>
        <h4 class="mb-1">Title:</h4>
        <input class="mb-3 w-40" type="text" name="title" id="title" placeholder=${data.title}>
        <h4 class="mb-1">Category:</h4>
        <input class="mb-3 w-40" type="text" name="category" id="category" placeholder=${data.category}>
        <h4 class="mb-1">Price:</h4>
        <input class="mb-3 w-40" type="number" name="price" id="price" placeholder=${data.price}>
        <h4 class="mb-1">Stock:</h4>
        <input class="mb-3 w-40" type="number" name="stock" id="stock" placeholder=${data.stock}>
        <button type="button" class="btn btn-primary" onclick="updateProduct('${data._id}')">Done</button>
    </form>
</div> 
`;

const queries = new URL(location.href)
const pid = queries.searchParams.get("id");
// route is /pages/manage.html?id=PID
// thats why i search the PID in the params with name id
// with that ID the data is retrieved to fill up the template

async function getProduct() { // retrieve product data
    try {
        let res = await fetch(`/api/products/${pid}`)
        res = await res.json()
        if(res.statusCode !== 200) {
            console.log("Product not found")
        } 
        const product = res.response
        const productHtml = template(product)
        console.log(product)
        document.querySelector("#editProduct").innerHTML = productHtml; 
    } catch (err) {
        console.error("Error fetching data")     
    }
   //function here
}

async function updateProduct() {
    try {
        const data = {
            photo: document.querySelector("#photo").value.trim() || undefined,
            title: document.querySelector("#title").value.trim() || undefined,
            category: document.querySelector("#category").value.trim() || undefined,
            price: document.querySelector("#price").value.trim() ? Number(document.querySelector("#price").value) : undefined,
            stock: document.querySelector("#stock").value.trim() ? Number(document.querySelector("#stock").value) : undefined,
        }
        const opts = {
            method: "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }
        let one = await fetch(`/api/products/${pid}`, opts)
        one = await one.json()
        if(one.statusCode !== 200) {
            return alert(one.message)
        }
        alert(one.message)  
        location.reload()
    } catch (err) {
        console.error("Error updating product")     
    }
}

document.addEventListener('DOMContentLoaded', () => { // execute getProduct ASAPL (page load)
    if(!pid) {
        document.querySelector("#productNotFound").innerHTML = "Product not found"
    }
    getProduct()
});

window.updateProduct = updateProduct;
