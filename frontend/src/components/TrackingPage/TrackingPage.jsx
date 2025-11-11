// TicketTrackingPage.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketByHashThunk } from '../../store/tickets';
import { BsFillPersonFill } from "react-icons/bs";

// import { IoMdDownload } from "react-icons/io";

import { PDFDownloadLink } from '@react-pdf/renderer';

import TrackingReport from './TrackingReport/TrackingReport';

import { ThemeContext } from '../../context/ThemeContext';

import { RiProgress1Line, RiProgress6Line, RiProgress8Line } from "react-icons/ri";

import './TrackingPage.scss';

function PerforatedZone() {
    return (
        <div className="perforated-zone">
            <div className="perforated-line"></div>
        </div>
    );
}

const TICKET_STATUSES = [
    {
        name: "Open",
        description: "The ticket has been created and is waiting to be assigned or reviewed."
    },
    {
        name: "In Progress",
        description: "Our team is actively working on resolving the issue described in the ticket."
    },
    {
        name: "Completed",
        description: "The work related to this ticket has been finished and the issue is resolved."
    }
];

function TicketStatusLegend() {
    return (
        <div className="status-legend">
            <h4 style={{ fontSize: '12px', fontWeight: '300', marginBottom: '5px' }}>What Do Ticket Statuses Mean?</h4>
            <ul>
                {TICKET_STATUSES.map((status, idx) => (
                    <li key={idx} className="status-item" style={{ listStyle: 'none', fontSize: '10px' }}>
                        <strong>{status.name}:</strong> {status.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function DownloadPDFButton({ ticket }) {
    return (
        <PDFDownloadLink
            document={<TrackingReport ticket={ticket} />}
            fileName="Ticket Status Report.pdf"
            style={{
                padding: '10px 20px',
                backgroundColor: '#e40613',
                color: 'white',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14
            }}
        >
            {({ loading }) => (loading ? 'Generating Report...' : 'Download Report')}
        </PDFDownloadLink>
    );
}

const TicketTrackingPage = () => {
    const { ticketHashedId } = useParams();
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.tickets.ticketByHash);
    const isLoading = useSelector(state => state.tickets.isLoading);
    const error = useSelector(state => state.tickets.error);

    // 👇 get theme from context
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (ticketHashedId) {
            dispatch(getTicketByHashThunk(ticketHashedId));
        }
    }, [dispatch, ticketHashedId]);

    if (isLoading) {
        return (
            <div className="ticket-details-tab">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <section className="app-section ticket-tracking">
                <div className="tracking-header">
                    <h1>We hit a snag</h1>
                </div>
                <div className="tracking-card error">
                    <p>{error}</p>
                    <p>Please contact support if this issue persists.</p>
                </div>
            </section>
        );
    }

    if (!ticket) {
        return (
            <section className="app-section ticket-tracking">
                <div className="tracking-header">
                    <h1>Ticket Not Found</h1>
                </div>
                <div className="tracking-card not-found">
                    <p>It seems this ticket does not exist or the link is incorrect.</p>
                </div>
            </section>
        );
    }

    const { StatusInfo, createdAt, updatedAt, description } = ticket;

    return (
        <section className="app-section-ticket-tracking">
            <div className="tracking-header">
                <div className='header-left'>
                    <div className='logo-container'>
                        <img
                            src={theme === 'dark' ? "/assets/logo-dark.png" : "/assets/logo-light.png"}
                            alt="Company Logo"
                            className="company-logo"
                        />
                    </div>
                    <div className='ticket-title-and-dates'>
                        <h1>Ticket Status Report</h1>
                        <div className="header-left-dates">
                            <span>
                                Created: {createdAt ? new Date(createdAt).toLocaleDateString() + ' ' + new Date(createdAt).toLocaleTimeString() : 'Unknown'}
                            </span>
                            <span className="divider"> | </span>
                            <span>
                                Last Update: {updatedAt ? new Date(updatedAt).toLocaleDateString() + ' ' + new Date(updatedAt).toLocaleTimeString() : 'Unknown'}
                            </span>
                        </div>
                    </div>
                </div>
                <span
                    className="ticket-status"
                    title={StatusInfo?.description}
                    style={{ backgroundColor: StatusInfo?.color }}
                >
                    {
                        (StatusInfo?.name === "Open") && (
                            <RiProgress1Line style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        )
                    }
                    {
                        (StatusInfo?.name === "In Progress") && (
                            <RiProgress6Line style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        )
                    }
                    {
                        (StatusInfo?.name === "Completed") && (
                            <RiProgress8Line style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        )
                    }
                    {StatusInfo?.name || 'Status unavailable'}
                </span>
            </div>
            <PerforatedZone />
            <div className="tracking-card">
                <div>
                    <h2>{ticket.title}</h2>
                    {
                        ticket.ClientInfo?.firstName ? (
                            <div className='client'>
                                {
                                    ticket.ClientInfo?.firstName ? (
                                        <>
                                            <div className='client-image'>
                                                {
                                                    ticket.ClientInfo?.profilePicUrl ? (
                                                        <img
                                                            src={ticket.ClientInfo?.profilePicUrl}
                                                            alt={`${ticket.ClientInfo.firstName} ${ticket.ClientInfo.lastName}`}
                                                            className="profile-image"
                                                        />
                                                    ) : (
                                                        <BsFillPersonFill style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                                    )
                                                }
                                            </div>
                                            <span>{ticket.ClientInfo.firstName} {ticket.ClientInfo.lastName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className='client-image'>
                                                {
                                                    ticket.ClientInfo?.profilePicUrl ? (
                                                        <img
                                                            src={ticket.ClientInfo?.profilePicUrl}
                                                            alt={`${ticket.ClientInfo.firstName} ${ticket.ClientInfo.lastName}`}
                                                            className="profile-image"
                                                        />
                                                    ) : (
                                                        <BsFillPersonFill style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                                    )
                                                }
                                            </div>
                                            <span>{ticket.ClientInfo.companyName}</span>
                                        </>
                                    )
                                }
                            </div>
                        ) : (
                            <div className='client-image'>
                                <BsFillPersonFill style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                <span>Anonymous Client</span>
                            </div>
                        )
                    }
                </div>
                <div className="tracking-details">
                    <div className="tracking-field">
                        <span className="label">Description:</span>
                        <span>{description || 'No description available'}</span>
                    </div>
                </div>
                <div className='download-pdf-report'>
                    <DownloadPDFButton ticket={ticket} />
                </div>
                <TicketStatusLegend />
            </div>
        </section>
    );
};

export default TicketTrackingPage;
