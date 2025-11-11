import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { MdLightMode, MdNightlight } from "react-icons/md";
import './IconThemeSwitch.css';

const IconThemeSwitch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark';

    return (
        <div
            className="icon-theme-switch"
            onClick={toggleTheme}
            style={{ cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >{isDarkMode ?
            <MdNightlight className='zoom-in' /> :
            <MdLightMode className='spin-in' />
            }
        </div>
    );
};

export default IconThemeSwitch;
