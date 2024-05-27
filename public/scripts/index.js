import { printRegister, printLogin, printProfile, printCart,  printLogout } from "./modules/printLayout.js";
import fetchProducts from "./modules/fetchProducts.js";
import printFilter from "./modules/printFilter.js";

printRegister()
printLogin()
printCart()
printLogout()
printProfile()

fetchProducts('products', '')

const searchSelector = document.querySelector('#search');
searchSelector.addEventListener('keyup', printFilter)










