export const fetchProducts = async (selectedCategoryId) => {
    let products;
    if (selectedCategoryId === -1) {
        products = window.apis.allProducts();
    } else {
        products = window.apis.productsByCategory(selectedCategoryId);
    }

    return products;
};

export const saveProduct = async (product) => {
    const response = await window.apis.saveProduct(product);
    return response;
    
};
