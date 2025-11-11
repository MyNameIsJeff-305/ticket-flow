import { FaTicket } from "react-icons/fa6";
import { useState } from "react";

import './Statistics.css';

export default function Statistics({ myTickets, todayTickets, status }) {

    // const newTickets = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Open')[0]?.id).length;
    // const inProgress = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'In Progress')[0]?.id).length;
    // const pending = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Pending')[0]?.id).length;
    // const completed = myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Closed')[0]?.id).length;

    const { today, all } = {
        today: {
            newTickets: todayTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Open')[0]?.id).length,
            inProgress: todayTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'In Progress')[0]?.id).length,
            pending: todayTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Pending')[0]?.id).length,
            completed: todayTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Closed')[0]?.id).length,
        },
        all: {
            newTickets: myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Open')[0]?.id).length,
            inProgress: myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'In Progress')[0]?.id).length,
            pending: myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Pending')[0]?.id).length,
            completed: myTickets?.filter(ticket => ticket.statusId === status?.filter(status => status.name === 'Closed')[0]?.id).length,
        }
    };

    const tabs = [
        { title: 'Today', key: 'today' },
        { title: 'All', key: 'all' },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0].key);

    if (!myTickets || !status) return (
        <section>
            <span>loading...</span>
        </section>
    )

    return (
        <section className="statistics-tab">
            <h1>Insights</h1>

            <div className="tabs-container">
                {tabs.map((tab) => (
                    <div className={`tab-item ${selectedTab === tab.key ? 'active' : ''}`} key={tab.key} onClick={() => setSelectedTab(tab.key)}>
                        {tab.title}
                    </div>
                ))}
            </div>

            {selectedTab === 'today' && (
                <div className="tickets-insights-container">
                    <div className="new-tickets-container">
                        <div className="left-side">
                            <h2>New Tickets</h2>
                            <span>{today.newTickets}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#FF6B6B' }} />
                    </div>
                    <div className="in-progress-tickets-container">
                        <div className="left-side">
                            <h2>In Progress</h2>
                            <span>{today.inProgress}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#FFB84C' }} />
                    </div>
                    <div className="pending-tickets-container">
                        <div className="left-side">
                            <h2>Pending</h2>
                            <span>{today.pending}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#7C3AED' }} />
                    </div>
                    <div className="done-tickets-container">
                        <div className="left-side">
                            <h2>Done Tickets</h2>
                            <span>{today.completed}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#4CAF50' }} />
                    </div>
                </div>
            )}

            {selectedTab === 'all' && (
                <div className="tickets-insights-container">
                    <div className="new-tickets-container">
                        <div className="left-side">
                            <h2>New Tickets</h2>
                            <span>{all.newTickets}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#FF6B6B' }} />
                    </div>
                    <div className="in-progress-tickets-container">
                        <div className="left-side">
                            <h2>In Progress</h2>
                            <span>{all.inProgress}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#FFB84C' }} />
                    </div>
                    <div className="pending-tickets-container">
                        <div className="left-side">
                            <h2>Pending</h2>
                            <span>{all.pending}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#7C3AED' }} />
                    </div>
                    <div className="done-tickets-container">
                        <div className="left-side">
                            <h2>Done Tickets</h2>
                            <span>{all.completed}</span>
                        </div>
                        <FaTicket style={{ fontSize: "60px", color: '#4CAF50' }} />
                    </div>
                </div>
            )}
        </section>
    );
}