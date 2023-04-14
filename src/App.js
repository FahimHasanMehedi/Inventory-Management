import React from "react";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/MainHeader/MainHeader";
import Sidebar from "./components/Sidebar/Sidebar";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";

const App = () => {
    return (
        <React.Fragment>
            <MainHeader />
            <Sidebar />
            <main>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/purchases" element={<Purchases />} />
                    {/* <Route path='' element={}/> */}
                </Routes>
            </main>
        </React.Fragment>
    );
};

export default App;
