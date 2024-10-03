import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './ThemeSwitch.css';

import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';

    return (
        <div className="theme-switch-container" style={{display:"flex", flexDirection:"row", alignContent:"center", alignItems:"center"}}>
            <span style={{fontSize: "24px"}}>{isDarkMode ? <FaMoon /> : <FaSun />}</span>
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