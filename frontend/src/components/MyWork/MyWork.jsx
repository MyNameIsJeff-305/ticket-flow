import MyWorkTicketCards from './MyWorkTicketCards';

import './MyWork.css';

export default function MyWork({ myTickets, status }) {

    const newTickets = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Open')[0]?.id);
    const inProgress = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'In Progress')[0]?.id);
    const pending = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Pending')[0]?.id);
    const completed = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Closed')[0]?.id);

    if (!myTickets || !status) return (
        <section className='my-work-tab'>
            <span className="loader"></span>
        </section>
    )

    return (
        <section className="my-work-tab">
            <h1>My Work</h1>

            <div className="my-work-section">
                <h3>New</h3>
                <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "400px" }}>
                    {
                        newTickets.length > 0 ? (
                            newTickets.map(ticket => (
                                <div key={ticket.id}>
                                    <MyWorkTicketCards key={ticket.id} ticket={ticket} />
                                </div>
                            ))
                        ) : (
                            <span style={{ marginLeft: "10px", fontStyle: "italic" }}>No New Tickets</span>
                        )
                    }
                </div>
            </div>

            <div className="my-work-section">
                <h3>In Progress</h3>
                <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "400px" }}>
                    {
                        inProgress.length > 0 ? (
                            inProgress.map(ticket => (
                                <div key={ticket.id}>
                                    <MyWorkTicketCards key={ticket.id} ticket={ticket} />
                                </div>
                            ))
                        ) : (
                            <span style={{ marginLeft: "10px", fontStyle: "italic" }}>No In Progress Tickets</span>
                        )
                    }
                </div>
            </div>

            <div className="my-work-section">
                <h3>Pending</h3>
                <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "400px" }}>
                    {
                        pending.length > 0 ? (
                            pending.map(ticket => (
                                <div key={ticket.id} >
                                    <MyWorkTicketCards key={ticket.id} ticket={ticket} />
                                </div>
                            ))
                        ) : (
                            <span style={{ marginLeft: "10px", fontStyle: "italic" }}>No Pending Tickets</span>
                        )
                    }
                </div>
            </div>

            <div className="my-work-section">
                <h3>Completed</h3>
                <div style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "400px" }}>
                    {
                        completed.length > 0 ? (
                            completed.map(ticket => (
                                <div key={ticket.id}>
                                    <MyWorkTicketCards key={ticket.id} ticket={ticket} />
                                </div>
                            ))
                        ) : (
                            <span style={{ marginLeft: "10px", fontStyle: "italic" }}>No Completed Tickets</span>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
