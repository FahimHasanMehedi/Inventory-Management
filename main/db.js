const Database = require("better-sqlite3");

const db = new Database("inventory.db");

const getData = () => {
    const stmt = db.prepare("SELECT * FROM products");
};

const insertData = () => {
    const stmt = db.prepare("INSERT INTO productCategory (name) VALUES (?)");

    const info = stmt.run("hardware");
};

const getCategories = () => {
    const stmt = db.prepare("SELECT * FROM productCategory");

    const data = stmt.all();

    return data;
};

const getProducts = () => {
    const stmt =
        db.prepare(`SELECT products.productCode, products.productName, products.productStock, productCategory.name AS categoryName
FROM products
JOIN productCategory
on productCategory.id = products.categoryId`);
    // const stmt = db.prepare("SELECT * FROM products");

    const data = stmt.all();

    return data;
};

const getProductsByCategory = (categoryId) => {
    const stmt =
        db.prepare(`SELECT products.productCode, products.productName, products.productStock, productCategory.name AS categoryName
FROM products
JOIN productCategory
on productCategory.id = products.categoryId
WHERE products.categoryId = ${categoryId}`);

    const data = stmt.all();
    return data;
};

const saveProduct = (productName, productCode, categoryId) => {
    const stmt = db.prepare("INSERT INTO products (productCode, productName, categoryId) VALUES (?, ?, ?)");
    const info = stmt.run(productCode, productName, categoryId);

    return info;
};

const saveCategory = (name) => {
    const stmt = db.prepare("INSERT INTO productCategory (name) VALUES (?)");

    const info = stmt.run(name);
    return info;
};

const deleteCategory = (categoryId) => {
    const stmt = db.prepare(`DELETE FROM productCategory WHERE id=${categoryId}`);
    const info = stmt.run();

    return info;
};

const checkProductName = (name) => {
    const stmt = db.prepare(`SELECT * FROM products WHERE productName=(?)`);

    const data = stmt.get(name);
    return data;
};
const checkProductCode = (code) => {
    const stmt = db.prepare(`SELECT * FROM products WHERE productCode=(?)`);

    const data = stmt.get(code);
    return data;
};
const checkCategory = (categoryName) => {
    const stmt = db.prepare(`SELECT * FROM productCategory WHERE name=(?)`);

    const data = stmt.get(categoryName);
    return data;
};

const addPurchase = ({ supplier, allSelectedProducts, date, totalAmount }) => {
    const updateMany = db.transaction((products) => {
        const insertPurchases = db.prepare("INSERT INTO purchases (supplier, purchaseDate, totalAmount) VALUES (?,?,?)");
        const updateProducts = db.prepare("UPDATE products SET productStock = productStock + (?) WHERE productCode = (?)");
        const insertItems = db.prepare("INSERT INTO purchasedItems VALUES (?,?,?,?)");

        const info = insertPurchases.run(supplier, date, totalAmount);
        for (let product of products) {
            updateProducts.run(product.quantity, product.productCode);
            insertItems.run(info.lastInsertRowid, product.productCode, product.productName, product.quantity);
        }
    });
    updateMany(allSelectedProducts);
};
const addSale = ({ customer, allSelectedProducts, date, totalAmount }) => {
    const updateMany = db.transaction((products) => {
        const insertPurchases = db.prepare("INSERT INTO sales (customer, saleDate, totalAmount) VALUES (?,?,?)");
        const updateProducts = db.prepare("UPDATE products SET productStock = productStock - (?) WHERE productCode = (?)");
        const insertItems = db.prepare("INSERT INTO soldItems VALUES (?,?,?)");

        const info = insertPurchases.run(customer, date, totalAmount);
        for (let product of products) {
            updateProducts.run(product.quantity, product.productCode);
            insertItems.run(info.lastInsertRowid, product.productName, product.quantity);
        }
    });
    updateMany(allSelectedProducts);
};

const getPurchasesData = () => {
    const stmt = db.prepare(
        "SELECT purchases.id, purchases.supplier, purchases.purchaseDate, purchases.totalAmount, purchasedItems.productCode, purchasedItems.productName, purchasedItems.quantity FROM purchases JOIN purchasedItems ON purchases.id = purchasedItems.purchaseId"
    );

    const data = stmt.all();
    console.log(data);
    return data;
};

module.exports = {
    getCategories,
    getProducts,
    getProductsByCategory,
    saveProduct,
    saveCategory,
    deleteCategory,
    checkProductCode,
    checkProductName,
    checkCategory,
    addPurchase,
    addSale,
    getPurchasesData,
};
