import { printOfflineIcons, printOnlineIcons} from "./modules/printLayout.js";
import fetchProducts from "./modules/fetchProducts.js";
import printFilter from "./modules/printFilter.js";

printOfflineIcons()
printOnlineIcons()

fetchProducts('products', '')

// Search filter 
const searchSelector = document.querySelector('#search');
searchSelector.addEventListener('keyup', printFilter)