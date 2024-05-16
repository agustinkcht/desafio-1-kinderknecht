const template = (data) => `
<a href="/pages/detail.html?id=${data._id}" class="card m-2" style="width: 18rem;">
    <img src="${data.photo}" class="card-img-top" alt="data-photo">
    <div class="card-body">
    <h4 class="card-title">${data.title}</h4>
    <p class="card-text">${data.category}</p>
    <h5 class="card-title">$${data.price}</h4>
  </div>
</div> 
`;

fetch('/api/products')
    .then(res=>res.json())
    .then(res=> {
        console.log(res.response);
        const products = res.response;
        document.querySelector('#products').innerHTML = products
        .map((each) => template(each))
        .join('')
    })
    .catch((err) => console.log(err));  




