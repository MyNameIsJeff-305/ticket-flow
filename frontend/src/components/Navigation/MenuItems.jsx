import { FaHome, FaTicketAlt } from "react-icons/fa";
import { FaUsers, FaBoxArchive } from "react-icons/fa6";

import { NavLink } from "react-router-dom";

import './MenuItems.css';

export default function MenuItems() {
    return (
        <menu className="menu">
            <NavLink to="/dashboard" className="menu-item">
                <FaHome />
                Dashboard
            </NavLink>
            <NavLink to="/tickets" className="menu-item">
                <FaTicketAlt />
                Tickets
            </NavLink>
            <NavLink to="/clients" className="menu-item">
                <FaUsers />
                Clients
            </NavLink>
            <NavLink to="/inventory" className="menu-item">
                <FaBoxArchive />
                Inventory
            </NavLink>
        </menu>
    )
}