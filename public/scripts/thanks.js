import { printOfflineIcons, printOnlineIcons } from "./modules/printLayout.js";

async function clearCart() {
  try {
    const url = "/api/carts/all";
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
  } catch (error) {
    console.log("error clearing cart", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  clearCart();
});
