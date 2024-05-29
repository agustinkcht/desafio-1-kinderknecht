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

let fetchSession = await fetch('/api/sessions/online');
        fetchSession = await fetchSession.json();
        const user_id = fetchSession.user_id;
// traigo user_id desde la session

fetch(`/api/users/${user_id}`)
    .then(res => res.json())
    .then(res => {
        console.log(res.response)
        const user = res.response;
        const userHtml = template(user);
        document.querySelector('#userData').innerHTML = userHtml
    })