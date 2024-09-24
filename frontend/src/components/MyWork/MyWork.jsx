import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyTicketsThunk } from "../../store/tickets";

import TicketCard from "./TicketCard";

import './MyWork.css';


export default function MyWork() {

    const dispatch = useDispatch();

    const myTickets = useSelector(state => state.tickets.myTickets);

    useEffect(() => {
        dispatch(getMyTicketsThunk());
    }, [dispatch]);

    if(!myTickets) return (
        <section>
            <span>loading...</span>
        </section>
    )

    return (
        <section className="my-work-tab">
            <h1>My Work</h1>
            {
                myTickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            }
        </section>
    )
}