import {useNavigate} from 'react-router-dom';

import './TicketCard.css'

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    if (now.getFullYear() === date.getFullYear()) {
        // Return "MM/DD" if it's within the same year
        return `${month}/${day}`;
    } else {
        // Return "MM/DD/YYYY" if it's from a different year
        return `${month}/${day}/${date.getFullYear()}`;
    }
}

export default function TicketCard({ ticket }) {
    const ticketStatus = ticket.statusId;

    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`/tickets/${ticket.id}`)
    }

    return (
        <div className={`ticket-card-${ticketStatus}`} onClick={() => handleClick()} style={{cursor: 'pointer'}}>
            <div className="ticket-card-left">
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
            </div>
            <div className='ticket-card-right'>
                <p>{formatDate(ticket.createdAt)}</p>
            </div>
        </div>
    )
}