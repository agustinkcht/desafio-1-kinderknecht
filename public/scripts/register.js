import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons();
printOnlineIcons();

document.querySelector("#register").addEventListener("click", async () => {
  alert("Processing... Press OK and wait")
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    age: Number(document.querySelector("#age").value),
    role: Number(document.querySelector("#role").value)
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/register", opts);
  response = await response.json();
  if (response.statusCode !== 201) {
    return alert("Unable to register: " + response.message)
  }
  alert(response.message + ". Re-directing to verification page.")
  location.replace("/pages/verify.html");
});