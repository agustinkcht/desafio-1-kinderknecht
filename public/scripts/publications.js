import { printOfflineIcons, printOnlineIcons} from "./modules/printLayout.js";
import fetchMyProducts from "./modules/fetchMyProducts.js";
import printMyFilter from "./modules/printMyFilter.js";

printOfflineIcons()
printOnlineIcons()

fetchMyProducts('products', '')

// Search filter 
const searchSelector = document.querySelector('#search');
searchSelector.addEventListener('keyup', printMyFilter)