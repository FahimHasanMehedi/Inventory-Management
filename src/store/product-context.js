import React, { useState, useEffect, useContext, useMemo } from "react";
import CategoryContext from "./category-context";

const ProductContext = React.createContext({});

export const ProductContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [willRender, setWillRender] = useState(false);
    const categoryCtx = useContext(CategoryContext);

    useEffect(() => {
        if (categoryCtx.selectedCategory === -1) {
            window.apis.allProducts().then((data) => {
                setProducts(data);
            });
        } else {
            window.apis.productsByCategory(categoryCtx.selectedCategory).then((data) => {
                setProducts(data);
            });
        }
    }, [categoryCtx.selectedCategory, willRender]);

    return <ProductContext.Provider value={{ products, setProducts, willRender, setWillRender }}>{props.children}</ProductContext.Provider>;
};

export default ProductContext;
