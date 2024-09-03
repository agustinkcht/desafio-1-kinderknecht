let pid

function createMyProductCard(product) {
    pid = product._id
    return `
    <div class="card m-2" style="width: 18rem;">
        <img src="${product.photo}" class="card-img-top" alt="product-photo">
        <div class="product-info text-center">
            <h4 class="card-title">${product.title}</h4>
            <p class="card-text">${product.category}</p>
            <h5 class="card-title">$${product.price}</h4>
        </div>
        <div class="mt-2 mb-2 d-flex flex-column align-items-center">
            <a href="/pages/manage.html?id=${product._id}" type="button" class="btn btn-primary w-75">Manage</a>
            <a href="#" id="delete" class="mt-2 text-danger" onclick="deleteProduct('${product._id}')">Delete Product</a>
        </div>
    </div> 
    `;
};

async function deleteProduct() {
    try {
        const opts = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        }
        let res = await fetch(`/api/products/${pid}`, opts)
        res = await res.json()
        console.log(res)    
        alert("Product deleted successfully")
        return location.reload()
    } catch (err) {
        console.log("Error deleting product")   
    }
}

window.deleteProduct = deleteProduct;

export default createMyProductCard;