import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaBuilding, FaUser } from "react-icons/fa";

import './MyWorkTicketCards.scss';
import { getAllStatusThunk } from '../../store/status';

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (now.getFullYear() === date.getFullYear()) {
        return `${month}/${day}`;
    } else {
        return `${month}/${day}/${date.getFullYear()}`;
    }
}

export default function TicketCard({ ticket }) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllStatusThunk(ticket.statusId));
    }, [dispatch, ticket.statusId]);

    const thisStatus = status.allStatus?.find(
        status => status.id === ticket.statusId
    );

    const handleClick = () => {
        navigate(`/tickets/${ticket.id}`);
    };

    const borderStyle = {
        borderLeft: `6px solid ${thisStatus ? thisStatus.color : 'gray'}`
    };

    return (
        <div
            className={`ticket-card-${ticket.statusId}`}
            style={borderStyle}
            onClick={handleClick}
        >
            <div className="ticket-card-left-m">
                <h3 className="ticket-card-title-m">
                    {ticket.title}
                </h3>
            </div>

            <div className="ticket-card-right">
                <p>{formatDate(ticket.createdAt)}</p>
            </div>
        </div>
    );
}
