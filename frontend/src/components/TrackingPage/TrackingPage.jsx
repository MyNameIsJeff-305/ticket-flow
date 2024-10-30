import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketByHashThunk } from '../../store/tickets';

const TicketTrackingPage = () => {
    const { ticketHashedId } = useParams();
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.tickets.ticketByHash);

    useEffect(() => {
        if (ticketHashedId) {
            dispatch(getTicketByHashThunk(ticketHashedId));
        }
    }, [dispatch, ticketHashedId]);

    // console.log(ticket, 'ticket');  // Check if ticket data is structured as expected

    if (!ticket) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!ticket.StatusInfo) {
        return (
            <div>
                <h1>Error: Status information missing</h1>
                <p>Please contact support.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Ticket Tracking</h1>
            <h2>Ticket ID: {ticket.id}</h2>
            <p>Status: {ticket.StatusInfo.name || 'Unknown'}</p>
            <p>Created On: {new Date(ticket.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
            <p>Description: {ticket.description}</p>
            {/* Additional ticket details */}
        </div>
    );
};

export default TicketTrackingPage;
