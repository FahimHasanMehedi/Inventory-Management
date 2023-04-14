export const addPurchase = async (purchase) => {
    const response = await window.apis.addPurchase(purchase)

    return response
}

export const fetchPurchases = async() => {
    const response = await window.apis.getPurchasesData();

    console.log(JSON.stringify(response[0]))
    return response
}