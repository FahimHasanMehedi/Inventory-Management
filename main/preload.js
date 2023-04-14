const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("apis", {
    categories: () => ipcRenderer.invoke("get categories"),
    allProducts: () => ipcRenderer.invoke("get products"),
    productsByCategory: (categoryId) => ipcRenderer.invoke("get products by category", { categoryId }),
    saveProduct: (product) => ipcRenderer.invoke("save a product", product),
    saveCategory: (name) => ipcRenderer.invoke("save a category", { name }),
    deleteCategory: (categoryId) => ipcRenderer.invoke("delete a category", { categoryId }),
    checkName: (name) => ipcRenderer.invoke("check name", { name }),
    checkCode: (code) => ipcRenderer.invoke("check code", { code }),
    checkCategory: (categoryName) => ipcRenderer.invoke("check category", { categoryName }),
    addPurchase: (purchase) => ipcRenderer.invoke("add a purchase", purchase),
    addSale: (sale) => ipcRenderer.invoke("add a sale", sale),
    getPurchasesData: () => ipcRenderer.invoke("get purchases data"),
});
