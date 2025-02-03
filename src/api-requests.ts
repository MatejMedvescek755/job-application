const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("BASEURL:", BASE_URL)

async function fetchProducts(category: string, offset = 0, limit = 24) {
    const response = await fetch(`${BASE_URL}/products/${category}?offset=${offset}&limit=${limit}`);
    return response.json();
}

async function fetchProductById(id: string) {
    const response = await fetch(`${BASE_URL}/product?id=${id}`);
    return response.json();
}

async function fetchFavorites() {
    const response = await fetch(`${BASE_URL}/favorites`);
    return response.json();
}

async function addFavorite(id: string) {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({ id }),
    });
    return response.json();
}

async function removeFavorite(id: string) {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({ id }),
    });
    return response.json();
}

async function fetchComments(id: string) {
    const response = await fetch(`${BASE_URL}/comments?id=${id}`);
    return response.json();
}

export default { fetchComments, fetchProducts, fetchProductById, fetchFavorites, addFavorite, removeFavorite } 