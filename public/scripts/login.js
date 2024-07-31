import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons();
printOnlineIcons();

document.querySelector("#login").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/login", opts);
  response = await response.json();
  console.log(response);
  if (response.statusCode === 200) {
    location.replace("/");
  }
  return alert(response.message);
});

document
  .querySelector("#forgotPassword")
  .addEventListener("click", async () => {
    alert("Processing... Press OK and wait");
    const data = {
      email: document.querySelector("#email").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    if (!data.email) {
      return alert("Please provide an email to receive a code");
    }
    let response = await fetch("/api/sessions/password", opts);
    response = await response.json();
    if (response.statusCode !== 200) {
      return alert("Error sending recovery email: " + response.message);
    }
    alert(response.message + ". Re-directing to Password Reset page")
    location.replace("/pages/password.html");  
  });
