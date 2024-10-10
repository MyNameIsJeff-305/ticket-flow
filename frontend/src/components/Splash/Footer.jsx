import { FaGithub } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Footer = () => {
    return (
        <footer className="footer" style={{ display: "flex", flexDirection: "column", justifyItems: "start" }}>
            <span>Contact Me</span>
            <div className="footer-links" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /></a>
            </div>
            {/* <ThemeSwitch /> */}
        </footer>
    );
};

export default Footer;
