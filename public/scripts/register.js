import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons();
printOnlineIcons();

document.querySelector("#register").addEventListener("click", async () => {
  alert("Processing... Press OK and wait")
  const data = {
    email: document.querySelector("#email").value.trim() || undefined,
    password: document.querySelector("#password").value.trim() || undefined,
    firstName: document.querySelector("#firstName").value.trim() || undefined,
    lastName: document.querySelector("#lastName").value.trim() || undefined,
    age: document.querySelector("#age").value.trim() ? Number(document.querySelector("#age").value) : undefined,
    role: document.querySelector("#role").value.trim() ? Number(document.querySelector("#role").value) : undefined,
    photo: document.querySelector("#photo").value.trim() || undefined
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