import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()

const template = (data) => `
<div class="card m-2" style="width: 18rem;">
    <div class="card-body">
        <h4 class="card-title">${data.product_id.title}</h4>
        <h5 class="card-title">$${data.product_id.price}</h4>
        <input type="number" class="form-control" value="${data.quantity}" min="1" oninput="updateQuantity('${data._id}', this.value)">
        <button type="button" class="btn btn-primary" onclick="removeItem('${data._id}')">X</button>
  </div>
</div> 
`;


async function fetchData() {
    try {
        let response = await fetch('/api/sessions/online');
        response = await response.json();
        const user_id = response.user_id;
        if(user_id) {
            let userCart = await fetch(`/api/carts?user_id=${user_id}`)
            const res = await userCart.json();
            const items = res.response;
            console.log(res.response)
            const itemsHtml = items
                .map(each => template(each))
                .join('');
            document.querySelector('#itemsOnCart').innerHTML = itemsHtml;    
        }   
    } catch (err) {
        console.log(err)
    };
};

async function updateQuantity(iid, newQuantity) {
    try {
        const quantity = parseInt(newQuantity, 10);
        const url = `/api/carts/${iid}`;
        const opts = {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ quantity: quantity })
        };
        let response = await fetch(url, opts)
        console.log('quantity updated', response)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}

async function removeItem(iid) {
    try {
        const url = `/api/carts/${iid}`;
        const opts = {
            method: 'DELETE',
            headers: {"Content-Type" : "application/json"}
        };
        let response = await fetch(url, opts)
        response = await response.json()
        console.log('item removed from cart', response)
        location.reload()
    } catch (error) {
        console.log(error)
    };
};

window.updateQuantity = updateQuantity;
window.removeItem = removeItem;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

// async function removeAll(uid) {
//     try {
//         const url = `/api/carts/user/${uid}`;
//         const opts = {
//             method: 'DELETE',
//             headers: {"Content-Type" : "application/json"}
//         };
//         let response = await fetch(url, opts)
//         response = await response.json()
//         console.log('Cart reset. All items removed.')
//         location.reload()
//     } catch(error) {
//         console.log(error)
//     };
// };



