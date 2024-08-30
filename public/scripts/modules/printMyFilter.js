import fetchMyProducts from "./fetchMyProducts.js";

async function printMyFilter(e) {
    const text = e.target.value;
    await fetchMyProducts('products', text);
};

export default printMyFilter;