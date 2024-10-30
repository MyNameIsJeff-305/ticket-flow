import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TicketTrackingPage = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`/api/tickets/${ticketId}`);
                if (!response.ok) throw new Error('Ticket not found');
                const data = await response.json();
                setTicket(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);

    if (loading) return <p>Loading ticket status...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Ticket Tracking</h1>
            <h2>Ticket ID: {ticket.id}</h2>
            <p>Status: {ticket.status}</p>
            <p>Created On: {new Date(ticket.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
            <p>Description: {ticket.description}</p>
            {/* Display more ticket details as needed */}
        </div>
    );
};

export default TicketTrackingPage;