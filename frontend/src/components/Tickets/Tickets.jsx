import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import './Tickets.css';
import { getAllTicketsThunk, getMyTicketsThunk, getTotalTicketsAmountThunk } from '../../store/tickets';
import TicketCard from '../MyWork/TicketCard';

export default function Tickets() {

    const dispatch = useDispatch();

    const allTickets = useSelector(state => state.tickets.allTickets);
    const totalTickets = useSelector(state => state.tickets.totalTicketsAmount);

    const [page, setPage] = useState(1);
    const TICKETS_PER_PAGE = 5;

    useEffect(() => {
        // Fetch tickets when the page changes
        dispatch(getAllTicketsThunk(page, TICKETS_PER_PAGE));
        dispatch(getTotalTicketsAmountThunk());
        dispatch(getMyTicketsThunk());
    }, [dispatch, page]);

    const lastPage = Math.ceil(totalTickets / TICKETS_PER_PAGE);

    if (!allTickets || !totalTickets) return (
        <section>
            <span>loading...</span>
        </section>
    )

    return (
        <section className='tickets-tab'>
            <div style={{width: "100%"}}>
                <div className='tickets-header'>
                    <h1>Tickets</h1>
                    <button className='add-ticket-btn'><div><FaCirclePlus /></div><span>Add Ticket</span></button>
                </div>
                <div className='tickets-container'>
                    {
                        allTickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    }
                </div>
            </div>
            <div className='tickets-footer'>
                <button className='prev-btn' disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                <div>
                    <span>
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
            </div>
        </section>
    )
}
