import { FaGithub, FaLinkedin } from "react-icons/fa";
import IconThemeSwitch from "../IconThemeSwitch";

import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact">
                <span>Contact Me</span>
                <div className="footer-links" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    <a href="https://github.com/MyNameIsJeff-305"><FaGithub /></a>
                    <a href="https://linkedin.com/in/mm4ever"><FaLinkedin /></a>
                </div>
            </div>
            <div className="theme">
                <IconThemeSwitch />
            </div>

        </footer>
    );
};

export default Footer;
