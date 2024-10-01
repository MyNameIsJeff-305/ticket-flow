const BenefitsSection = () => {
    const benefits = [
        {
            icon: '🎟️',
            title: 'Efficient Ticket Tracking',
            description: 'Track, manage, and resolve tickets with ease.'
        },
        {
            icon: '🔔',
            title: 'Real-Time Notifications',
            description: 'Get instant notifications for updates and assignments.'
        },
        {
            icon: '🤝',
            title: 'Seamless Collaboration',
            description: 'Assign team members, leave comments, and attach files.'
        }
    ];

    return (
        <section className="benefits">
            <h2>Why Choose ticketFlow?</h2>
            <div className="benefits-list">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                        <span className="icon">{benefit.icon}</span>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;