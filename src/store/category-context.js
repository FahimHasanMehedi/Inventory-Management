import React, { useState, useEffect } from "react";

const CategoryContext = React.createContext({});

export const CategoryContextProvider = (props) => {
    const [productsOpen, setProductsOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(-1);

    useEffect(() => {
        window.apis.categories().then((data) => {
            setGroups(data);
        });
    }, [selectedCategory]);
    return (
        <CategoryContext.Provider
            value={{ groups, setGroups, selectedCategory, setSelectedCategory, productsOpen, setProductsOpen }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;
