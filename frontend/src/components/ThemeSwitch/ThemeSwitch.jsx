import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './ThemeSwitch.css';

import { FaRegSun, FaRegMoon } from "react-icons/fa";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';

    return (
        <div className="theme-switch-container">
            <span style={{fontSize: "24px"}}>{isDarkMode ? <FaRegMoon /> : <FaRegSun />}</span>
            <label className="theme-switch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ThemeSwitch;