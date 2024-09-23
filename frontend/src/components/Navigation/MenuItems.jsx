import { FaHome } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import { NavLink } from "react-router-dom";

import './MenuItems.css';

export default function MenuItems() {
    return (
        <menu className="menu">
            <NavLink to="/dashboard" className="menu-item" activeClassName="active">
                <FaHome />
                Dashboard
            </NavLink>
            <NavLink to="/tickets" className="menu-item" activeClassName="active">
                <FaTicketAlt />
                Tickets
            </NavLink>
            <NavLink to="/parts" className="menu-item" activeClassName="active">
                <FaTools />
                Parts
            </NavLink>
            <NavLink to="/clients" className="menu-item" activeClassName="active">
                <FaUsers />
                Clients
            </NavLink>
        </menu>
    )
}