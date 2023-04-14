import React from "react";
import PurchasesHeader from "../components/Purchases/PurchasesHeader/PurchasesHeader";
import PurchasesTable from "../components/Purchases/PurchasesTable/PurchasesTable";

import "./Purchases.css";

const Purchases = () => {
    return (
        <div className="purchases">
            {/* <PurchasesHeader /> */}
            <PurchasesTable />
            
        </div>
    );
};

export default Purchases;
