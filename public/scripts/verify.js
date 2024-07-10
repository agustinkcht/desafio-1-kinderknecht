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
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/verify", opts);
  response = await response.json();
  if (response.statusCode !== 200) {
    return alert(response.message);
  }
  location.replace("/");
  return alert(response.message);
});
