const template = (data) => `
<div class="card m-2" style="width: 18rem;">
    <img src="${data.photo}" class="card-img-top" alt="data-photo">
    <div class="card-body">
    <h4 class="card-title">${data.title}</h4>
    <h5 class="card-title">$${data.price}</h4>
    <button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Add to Cart</button>
  </div>
</div> 
`;


const queries = new URL(location.href);
const pid = queries.searchParams.get('id');

fetch(`/api/products/${pid}`)
    .then(res => res.json())
    .then(res => {
        console.log(res.response) //objeto
        const product = res.response;
        const productHtml = template(product);
        document.querySelector('#product').innerHTML = productHtml;
    })
    .catch(error => {
        console.log('error fetching data', error)
})

async function addToCart(pid) {
    try {
        const data = {
            user_id: '663ce82357109ba2e5d3b56c',
            product_id: pid,
            quantity: 1 
        }; // user_id y quantity hardcodeadas provisoriamente
        const url = '/api/carts';
        const opts = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type" : "application/json"}
        };
        let response = await fetch(url, opts)
        response = await response.json()
        console.log('added to cart', response)
    } catch (error) {
        console.log(error)
    };
};

