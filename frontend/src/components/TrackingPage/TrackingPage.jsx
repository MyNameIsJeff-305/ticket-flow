import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketByHashThunk } from '../../store/tickets';
import './TrackingPage.css';

const TicketTrackingPage = () => {
    const { ticketHashedId } = useParams();
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.tickets.ticketByHash);
    const isLoading = useSelector(state => state.tickets.isLoading);
    const error = useSelector(state => state.tickets.error);

    useEffect(() => {
        if (ticketHashedId) {
            dispatch(getTicketByHashThunk(ticketHashedId));
        }
    }, [dispatch, ticketHashedId]);

    if (isLoading) {
        return (
            <div className="loading">
                <h1>Loading Ticket Information...</h1>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h1>Error Loading Ticket</h1>
                <p>{error}</p>
                <p>Please contact support if this issue persists.</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="not-found">
                <h1>Ticket Not Found</h1>
                <p>It seems this ticket does not exist or the link is incorrect.</p>
            </div>
        );
    }

    const { id, StatusInfo, createdAt, updatedAt, description } = ticket;

    console.log(ticket, "THIS IS A TICKET");

    return (
        <div className="ticket-tracking">
            <div className="ticket-card">
                <h1>Ticket Tracking</h1>
                <div className="ticket-details">
                    <p>Ticket ID: <span>{id}</span></p>
                    <p>Status: <span>{StatusInfo?.name || 'Status unavailable'}</span></p>
                    <p>Created On: <span>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown'}</span></p>
                    <p>Last Updated: <span>{updatedAt ? new Date(updatedAt).toLocaleDateString() : 'Unknown'}</span></p>
                    <p>Description: <span>{description || 'No description available'}</span></p>
                </div>
            </div>
        </div>
    );
};

export default TicketTrackingPage;
