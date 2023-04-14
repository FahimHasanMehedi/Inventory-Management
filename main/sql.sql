SELECT purchases.id, purchases.supplier, purchases.purchaseDate, purchases.totalAmount, 
GROUP_CONCAT(CONCAT( purchasedItems.productName,'(',purchasedItems.productCode, ')' ,'-', purchasedItems.quantity) 
AS purchasedItems FROM purchases JOIN purchasedItems ON purchases.id = purchasedItems.purchaseId