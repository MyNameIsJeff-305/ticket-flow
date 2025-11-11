import { LuTicketPlus } from "react-icons/lu";

import TicketCard from '../../../MyWork/MyWorkTicketCards';
import OpenModalMenuItem from '../../../Navigation/OpenModalMenuItem';
import AddTicket from '../../../AddTicket';

import { getClientTicketsThunk } from '../../../../store/clients';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './ClientTickets.scss';

export default function ClientTickets({ clientId }) {
    const dispatch = useDispatch();

    const [ticketsChecker, setTicketsChecker] = useState(false);

    const clientTickets = useSelector(state => state.clients.client?.tickets);

    useEffect(() => {
        dispatch(getClientTicketsThunk(clientId));
    }, [dispatch, clientId]);

    useEffect(() => {
        if (ticketsChecker) {
            dispatch(getClientTicketsThunk(clientId));
            setTicketsChecker(false);
        }
    }, [ticketsChecker, dispatch, clientId]);

    if (!clientTickets) return <div>Loading...</div>;

    const onModalClose = () => {
        setTicketsChecker(true);
    }

    return (
        <div className="client-tickets">
            <div className="client-tickets-header">
                <h2>Client Tickets</h2>
                <OpenModalMenuItem
                    modalComponent={<AddTicket clientIdClient={clientId} setTicketsChecker={setTicketsChecker} />}
                    onModalClose={onModalClose}
                >
                    <div className="add-ticket-button">
                        <LuTicketPlus />
                        <div>Add Ticket</div>
                    </div>
                </OpenModalMenuItem>
            </div>

            <div className="ticket-list">
                {clientTickets && clientTickets.length > 0 ? (
                    clientTickets.map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))
                ) : (
                    <p className="no-tickets">No tickets available for this client.</p>
                )}
            </div>
        </div>
    );
}
