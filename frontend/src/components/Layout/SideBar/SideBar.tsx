import { NavLink } from 'react-router-dom';
import ThemeSwitch from '../../ThemeSwitch';

import {
    HiOutlineUserGroup,
    HiOutlineIdentification,
    HiOutlineTicket,
    HiOutlineHome,
    HiOutlineClipboardCheck
} from "react-icons/hi";

import { MdOutlineAssessment } from "react-icons/md";

import './SideBar.scss';
import ProfileControl from '../ProfileControl';

export default function SideBar() {
    return (
        <nav className="sidebar">
            <NavLink to="/" className="brand">
                <img src="/assets/logo-dark.png" className='logo-main' alt='logo'></img>
            </NavLink>

            <ul className="nav-list">
                <li>
                    <NavLink to="/dashboard" className="nav-item">
                        <HiOutlineHome className='nav-icon' />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tickets" className="nav-item">
                        <HiOutlineTicket className='nav-icon' />
                        Tickets
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clients" className="nav-item">
                        <HiOutlineUserGroup className='nav-icon' />
                        Clients
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/assessments" className="nav-item">
                        <MdOutlineAssessment className='nav-icon' />
                        Assessments
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inventory" className="nav-item">
                        <HiOutlineClipboardCheck className='nav-icon' />
                        Inventory
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/employees" className="nav-item">
                        <HiOutlineIdentification className='nav-icon' />
                        Employees
                    </NavLink>
                </li>
            </ul>
            <ThemeSwitch />
            <ProfileControl />
        </nav >
    );
}