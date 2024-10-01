const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'John Doe',
            feedback: 'ticketFlow streamlined our IT processes and saved us hours each week.'
        },
        {
            name: 'Jane Smith',
            feedback: 'The real-time collaboration and notifications have improved our efficiency significantly.'
        }
    ];

    return (
        <section className="testimonials">
            <h2>Trusted by IT Teams Worldwide</h2>
            <div className="testimonials-list">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        <p>{testimonial.feedback}</p>
                        <h4>- {testimonial.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
