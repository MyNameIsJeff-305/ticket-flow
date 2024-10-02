import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links" style={{width:"100%"}}>
                <a href="https://github.com/MyNameIsJeff-305"><FaGithub /> Contact Me</a>
            </div>
            <p style={{ fontSize: "10px", textAlign: "right" }}>ticketFlow is an intuitive and powerful ticket management system designed specifically for IT businesses. With streamlined workflows, real-time tracking, and comprehensive reporting features, ticketFlow ensures that IT support teams can efficiently manage tasks, resolve issues faster, and provide exceptional service. From ticket creation to resolution, ticketFlow keeps your IT operations organized, helping you stay on top of all support requests and improve customer satisfaction.</p>
        </footer>
    );
};

export default Footer;
