import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

import './Tickets.css';
import { getAllTicketsThunk, getMyTicketsThunk, getTotalTicketsAmountThunk } from '../../store/tickets';
import TicketCard from '../MyWork/TicketCard';
import AddTicket from '../AddTicket/AddTicket';

export default function Tickets() {

    const dispatch = useDispatch();

    const allTickets = useSelector(state => state.tickets.allTickets);
    const totalTickets = useSelector(state => state.tickets.totalTicketsAmount);

    const [page, setPage] = useState(1);
    const [ticketsChecker, setTicketsChecker] = useState(false);

    const TICKETS_PER_PAGE = 8;

    useEffect(() => {
        // Fetch tickets when the page changes or when a new ticket is added
        dispatch(getTotalTicketsAmountThunk());
        dispatch(getAllTicketsThunk(page, TICKETS_PER_PAGE));
        dispatch(getMyTicketsThunk());
        setTicketsChecker(false); // Reset after re-fetching the tickets
    }, [dispatch, page, ticketsChecker]);

    const lastPage = Math.ceil(totalTickets / TICKETS_PER_PAGE);

    if (!allTickets || !totalTickets) return (
        <section className='tickets-tab'>
            <span className="loader"></span>
        </section>
    )

    const onModalClose = () => {
        setTicketsChecker(true); // Trigger re-fetch when modal is closed after adding a new ticket
    }

    return (
        <section className='tickets-tab'>
            <div>
                <div className={`tickets-header`}>
                    <h1>Tickets</h1>
                    <div className='add-ticket-btn' style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                        <FaCirclePlus />
                        <OpenModalMenuItem
                            itemText={"Add Ticket"}
                            modalComponent={<AddTicket setTicketsChecker={setTicketsChecker} />}
                            onModalClose={onModalClose} // Call onModalClose after modal closes
                        ></OpenModalMenuItem>
                    </div>
                </div>
                <div className='tickets-container'>
                    {
                        <div>
                            {allTickets.map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className='tickets-footer'>
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
            </div>
        </section>
    )
}
