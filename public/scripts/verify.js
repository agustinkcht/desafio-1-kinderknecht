import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

printOfflineIcons();
printOnlineIcons();

document.querySelector("#submit").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    code: document.querySelector("#code").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // pass email & code (data object) as req.body
  };
  let response = await fetch("/api/sessions/verify", opts);
  response = await response.json();
  if (response.statusCode !== 200) {
    return alert(response.message); // if verification fails, returns alert (and function stops)
  }
  alert(response.message); // if verification succeed, the alert is shown and location replace done.
  location.replace("/");
});
