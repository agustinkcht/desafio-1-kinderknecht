function createProductCard(product) {
    return `
    <a href="./pages/detail.html?id=${product._id}" class="card m-2" style="width: 18rem;">
        <img src="${product.photo}" class="card-img-top" alt="product-photo">
        <div class="product-info text-center">
            <h4 class="card-title">${product.title}</h4>
            <p class="card-text">${product.category}</p>
            <h5 class="card-title">$${product.price}</h4>
        </div>
    </a> 
    `;
};

export default createProductCard;