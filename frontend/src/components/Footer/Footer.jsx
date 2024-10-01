import { FaGithub } from "react-icons/fa";

import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /> Contact Us</a>
            </div>
            <p style={{fontSize: "10px", width:"70%"}}></p>
        </footer>
    );
};

export default Footer;
