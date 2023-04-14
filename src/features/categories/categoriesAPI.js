export const fetchCategories = async () => {
    const response = await window.apis.categories();
    return response;
};

export const saveCategory = async (categoryName) => {
    const response = await window.apis.saveCategory(categoryName);

    return response;
};

export const deleteCategory = async (categoryId) => {
    const response = await window.apis.deleteCategory(categoryId);
    console.log(response);
    return response;
};
