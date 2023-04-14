export const addSale = async (sale) => {
    const response = await window.apis.addSale(sale);

    return response;
};
