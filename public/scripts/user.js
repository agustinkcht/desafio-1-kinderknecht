import { printRegister, printLogin, printProfile, printCart, printLogout } from "./modules/printLayout.js";

printRegister()
printLogin()
printProfile()
printCart()
printLogout()

const template = (data) => `
<div class="card m-2" style="width: 24rem;">
    <img src="${data.photo}" class="card-img-top" alt="data-photo">
    <div class="card-body">
    <h4 class="card-title">${data.email}</h4>
    <h5 class="card-title">Role: ${data.role}</h4>
  </div>
</div> 
`;

fetch('/api/users/663ce82357109ba2e5d3b56c')
    .then(res => res.json())
    .then(res => {
        console.log(res.response)
        const user = res.response;
        const userHtml = template(user);
        document.querySelector('#userData').innerHTML = userHtml
    })