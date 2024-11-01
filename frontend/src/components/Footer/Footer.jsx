import { FaGithub } from "react-icons/fa";

import './Footer.css'
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /> Contact Me</a>
            </div>
            <div>
                <ThemeSwitch />
            </div>
        </footer>
    );
};

export default Footer;
