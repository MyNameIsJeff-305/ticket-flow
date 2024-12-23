import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaBuilding, FaUser } from "react-icons/fa";

import './MyWorkTicketCards.css'
import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(getAllStatusThunk(ticket.statusId));
    }, [dispatch, ticket.statusId]);

    const ticketStatus = ticket.statusId;

    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`/tickets/${ticket.id}`)
    }

    const thisStatus = status.allStatus?.find(status => status.id === ticket.statusId);

    return (
        <div className={`ticket-card-${ticketStatus}`} style={thisStatus ? { borderLeft: `6px solid ${thisStatus.color}`, cursor: 'pointer', display: "flex", flex: 1 } : { borderLeft: `6px solid gray`, cursor: 'pointer' }} onClick={() => handleClick()}>
            <div className="ticket-card-left-m">
                <h3 style={{ textOverflow: "ellipsis", fontSize: "16px" }}>
                    {ticket.title}
                    {
                        ticket.clientId.companyName !== '' ? (
                            <div>
                                <span style={{ alignItems: "center", fontSize: "12px" }}><FaBuilding /> {ticket.clientId.companyName}</span>
                            </div>
                        ) : (
                            <div>
                                <span style={{ alignItems: "center", fontSize: "12px" }}><FaUser /> {ticket.clientId.firstName} {ticket.clientId.lastName}</span>
                            </div>
                        )
                    }
                </h3>
                {
                    typeof (ticket.createdBy) !== "number" && <span>Created by: {ticket.createdBy.firstName}</span>
                }
                {typeof (ticket.createdBy) === "number" && <p style={{fontSize: "14px"}}>{ticket.description}</p>}
            </div >
            <div className='ticket-card-right'>
                <p>{formatDate(ticket.createdAt)}</p>
            </div>
        </div >
    )
}