import printMyProductCards from "./printMyProductCards.js";

async function fetchMyProducts(id, filter) {
    try {
        const query = location.search
        const params = new URLSearchParams(query)
        const page = params.get('page')
        let res = await fetch(
            `/api/products/me?page=${page || 1}&title=${filter}`
        );
        res = await res.json();
        console.log(res)
        const prev = document.querySelector('#prev');
        res.paginateInfo.prevPage && (
            prev.innerHTML = `<a href='/pages/publications.html?page=${res.paginateInfo.prevPage}'> Previous Page </a>`
        );
        const next = document.querySelector('#next');
        res.paginateInfo.nextPage && (
            next.innerHTML = `<a href='/pages/publications.html?page=${res.paginateInfo.nextPage}'> Next Page </a>`
        );
        printMyProductCards(res.response, id);
    } catch (err) {
        console.log(err) 
    };
};

export default fetchMyProducts;