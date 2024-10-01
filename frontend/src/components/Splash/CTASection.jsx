import { useNavigate } from "react-router-dom";

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <section className="ctass">
            <h2>Ready to Transform Your IT Workflow?</h2>
            <button className="cta-button" onClick={() => navigate('login')}>Try ticketFlow Free Today</button>
        </section>
    );
};

export default CTASection;
