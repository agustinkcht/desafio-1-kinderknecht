import fetchProducts from "./fetchProducts.js";

async function printFilter(e) {
    const text = e.target.value;
    await fetchProducts('products', text);
};

export default printFilter;