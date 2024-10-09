import { FaGithub } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links" style={{width:"100%"}}>
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /> Contact Me</a>
            </div>
            <ThemeSwitch />
        </footer>
    );
};

export default Footer;
