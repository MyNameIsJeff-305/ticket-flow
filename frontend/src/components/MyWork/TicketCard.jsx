import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBuilding, FaUser, FaTrash } from "react-icons/fa";
import { useEffect } from 'react';
import { getAllStatusThunk } from '../../store/status';
import ConfirmDeleteTicket from "../ConfirmDeleteTicket";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './TicketCard.css';

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

export default function TicketCard({ ticket, setDeleteTicketChecker }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const status = useSelector(state => state.status);

    useEffect(() => {
        dispatch(getAllStatusThunk(ticket.statusId));
    }, [dispatch, ticket.statusId]);

    const ticketStatus = ticket.statusId;
    const navigate = useNavigate();

    const handleClick = () => {
        return navigate(`/tickets/${ticket.id}`);
    };

    const thisStatus = status.allStatus?.find(status => status.id === ticket.statusId);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`ticket-card-${ticketStatus}`}
            style={thisStatus ? { borderLeft: `6px solid ${thisStatus.color}`, cursor: 'pointer' } : { borderLeft: `6px solid gray`, cursor: 'pointer' }}
            onClick={handleClick}
        >
            <div className="ticket-card-left">
                <div>
                    <h3 style={{ textOverflow: "ellipsis" }}>
                        {ticket.title}
                    </h3>
                    {typeof (ticket.createdBy) !== "number" && <span>Created by: {ticket.createdBy.firstName}</span>}
                    {typeof (ticket.createdBy) === "number" && <p>{ticket.description}</p>}
                </div>
                <div>
                    {ticket.clientId.companyName !== '' ? (
                        <div className='client-container-company'>
                            <FaBuilding />
                            <span>{ticket.clientId.companyName}</span>
                        </div>
                    ) : (
                        <div className='client-container-personal'>
                            <FaUser />
                            <span style={{ textOverflow: "ellipsis" }}>{ticket.clientId.firstName} {ticket.clientId.lastName}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className='ticket-card-right'>
                <p>{formatDate(ticket.createdAt)}</p>
                {user.id === ticket.createdBy?.id && (
                    <div className="edit-ticket-btn-ticketcard" onClick={handleDeleteClick}>
                        <OpenModalMenuItem
                            itemText={<FaTrash />}
                            modalComponent={<ConfirmDeleteTicket ticket={ticket} setDeleteTicketChecker={setDeleteTicketChecker} />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
