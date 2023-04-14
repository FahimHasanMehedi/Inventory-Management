// ./public/electron.js
const path = require("path");

const db = require("./db.js");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.menuBarVisible = false;

    // and load the index.html of the app.
    // win.loadFile("index.html");

    ipcMain.handle("get categories", db.getCategories);
    ipcMain.handle("get products", db.getProducts);
    ipcMain.handle("get products by category", (event, { categoryId }) => db.getProductsByCategory(categoryId));
    ipcMain.handle("save a product", (event, { productName, productCode, categoryId }) =>
        db.saveProduct(productName, productCode, categoryId)
    );
    ipcMain.handle("save a category", (event, { name }) => db.saveCategory(name));
    ipcMain.handle("delete a category", (event, { categoryId }) => db.deleteCategory(categoryId));
    ipcMain.handle("check name", (event, { name }) => db.checkProductName(name));
    ipcMain.handle("check code", (event, { code }) => db.checkProductCode(code));
    ipcMain.handle("check category", (event, { categoryName }) => db.checkCategory(categoryName));
    ipcMain.handle("add a purchase", (event, purchase) => db.addPurchase(purchase));
    ipcMain.handle("add a sale", (event, sale) => db.addSale(sale));
    ipcMain.handle("get purchases data", db.getPurchasesData);

    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

//install the redux devtools extension

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
