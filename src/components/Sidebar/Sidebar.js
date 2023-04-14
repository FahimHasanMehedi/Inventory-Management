import React from "react";
import ListItem from "./Listitem/ListItem";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="lists">
                <ListItem path="/" name="Dashboard" icon={<DashboardOutlinedIcon style={{ fontSize: 24 }} />} />
                <ListItem path="/products" name="Products" icon={<Inventory2OutlinedIcon style={{ fontSize: 24 }} />} />
                <ListItem path="/purchases" name="Purchases" icon={<SellOutlinedIcon style={{ fontSize: 24 }} />} />
            </ul>
        </div>
    );
};

export default Sidebar;
