import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons()
printOnlineIcons()


const template = (data) => `
<div class="m-3">
    <div>
        <h5 class="card-title">${data.product_id.title} - $${data.product_id.price} - units: ${data.quantity} </h5>
        <span> subtotal: $${data.quantity * data.product_id.price} </span>
  </div>
</div> 
`;

const ticketTemplate = (total, formattedDate) => `
    <div class="d-flex flex-column m-3">
        <h4 class="mb-2"> TOTAL: $${total} </h4>
        <span> ${formattedDate} </span>
    </div>
`;

const doneBtn = `
 <button href="/" class="btn btn-primary" onclick="clearCart()">Done</button>
`;

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};

async function fetchData() {
    try {
        // fetching cart info
        let response = await fetch('/api/sessions/online');
        response = await response.json();
        const user_id = response.user_id;
        if(user_id) {
            let userCart = await fetch(`/api/carts?user_id=${user_id}`)
            const res = await userCart.json();
            const items = res.response;
            console.log(res.response)
            if (items.length > 0) {
                const itemsHtml = items
                .map(each => template(each))
                .join('');
                document.querySelector('#itemsOnCart').innerHTML = itemsHtml;
                document.querySelector('#returnToHome').innerHTML = doneBtn;   
            } else {
                let noItemsMessage = `Unable to generate ticket`;
                document.querySelector('#itemsOnCart').innerHTML = noItemsMessage
            }; 
        };
    } catch (err) {
        console.log(err)
    };
};

async function fetchTicket() {
    try {
        // fetching ticket
        let ticket = await fetch('/api/tickets')
        ticket = await ticket.json()
        // accessing and formatting ticket data
        const total = ticket.response[0].total;
        let date = ticket.response[0].date;
        date = new Date(date)
        const formattedDate = date.toLocaleDateString('en-US', dateOptions)
        // passing to template & printing in html
        if (total && formattedDate) {
            const ticketOnTemplate = ticketTemplate(total, formattedDate)
            document.querySelector("#ticket").innerHTML = ticketOnTemplate;
        }  
    } catch (error) {
        console.log(error)
    }

}

async function clearCart() {
    try {
        const url = "/api/carts/all";
        const opts = {
            method: "DELETE",
            headers: {"Content-Type" : "application/json"}
        };
        let response = await fetch(url, opts);
        response = await response.json()
        console.log('Purchase ended. Cart cleared.', response)
        alert('Redirecting home')
        location.replace("/")
    } catch (error) {
        console.log('error clearing cart', error)
    }
}

window.clearCart = clearCart;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    fetchTicket();
});