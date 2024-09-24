import './Statistics.css';

export default function Statistics() {
    return (
        <section className="statistics-tab">
            <h1>Insights</h1>
            <div className="tickets-insights-container">
                <div className="new-tickets-container">
                    <h2>New Tickets</h2>
                    <span>0</span>
                </div>
                <div className="in-progress-tickets-container">
                    <h2>In Progress</h2>
                    <span>0</span>
                </div>
                <div className="done-tickets-container">
                    <h2>Done Tickets</h2>
                    <span>0</span>
                </div>
            </div>
        </section>
    );
}