import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Revolutionize Your IT Ticket Management with ticketFlow</h1>
                <p>Simplify workflows, enhance communication, and improve efficiency for IT teams.</p>
                <button className="cta-button" onClick={() => navigate('/login')}>Get Started for Free</button>
            </div>
            <div className="hero-image">
                <img src='/assets/computer.webp' alt="ticketFlow Interface" />
            </div>
        </section>
    );
};

export default HeroSection;