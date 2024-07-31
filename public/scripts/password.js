import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons();
printOnlineIcons();

document.querySelector("#submit").addEventListener("click", async () => {
  const data = {
    code: document.querySelector("#code").value,
    password: document.querySelector("#password").value
  };
  const opts = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // pass code & password (data object) in the req.body
  };
  let response = await fetch("/api/sessions/password", opts);
  response = await response.json();
  if (response.statusCode !== 200) {
    return alert(response.message); // if verification fails, returns alert (and function stops)
  }
  alert(response.message); // if verification succeed, the alert is shown and location replace done.
  location.replace("/pages/login.html");
});

