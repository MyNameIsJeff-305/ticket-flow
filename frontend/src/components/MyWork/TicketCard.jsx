import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './TicketCard.css'
import { useEffect } from 'react';
import { getAllStatusThunk } from '../../store/status';

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
    const dispatch = useDispatch();

    const status = useSelector(state => state.status);

    useEffect(() => {
        dispatch(getAllStatusThunk(ticket.statusId));
    }, [dispatch]);

    const ticketStatus = ticket.statusId;

    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`/tickets/${ticket.id}`)
    }

    const thisStatus = status.allStatus?.find(status => status.id === ticket.statusId);

    return (
        <div className={`ticket-card-${ticketStatus}`} style={thisStatus ? {borderLeft: `6px solid ${thisStatus.color}`, cursor: 'pointer'} : {borderLeft: `6px solid gray`, cursor: 'pointer'}} onClick={() => handleClick()}>
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