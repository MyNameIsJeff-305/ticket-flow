import TicketCard from "./TicketCard";

import './MyWork.css';


export default function MyWork({myTickets, status}) {

    const newTickets = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Open')[0].id);
    const inProgress = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'In Progress')[0].id);
    const completed = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Closed')[0].id);


    if (!myTickets || !status) return (
        <section>
            <span>loading...</span>
        </section>
    )

    return (
        <section className="my-work-tab">
            <h1>My Work</h1>
            <div style={{ width: "100%" }}>
                <h3>New Tickets</h3>
                {
                    newTickets.length > 0 ? (
                        newTickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    ) : (
                        <span style={{marginLeft: "10px", fontStyle: "italic"}}>No New Tickets</span>
                    )
                }
            </div>
            <div style={{ width: "100%" }}>
                <h3>In Progress Tickets</h3>
                {
                    inProgress.length > 0 ? (
                        inProgress.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    ) : (
                        <span style={{marginLeft: "10px", fontStyle: "italic"}}>No In Progress Tickets</span>
                    )
                }
            </div>
            <div style={{ width: "100%" }}>
                <h3>Completed</h3>
                {
                    completed.length > 0 ? (
                        completed.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    ) : (
                        <span style={{marginLeft: "10px", fontStyle: "italic"}}>No Completed Tickets</span>
                    )
                }
            </div>
        </section>
    )
}