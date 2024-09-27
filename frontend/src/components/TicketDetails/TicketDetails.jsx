import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddNote from "../AddNote/AddNote";

import { FaBuilding, FaUser, FaPen, FaTrash, FaPlusCircle } from "react-icons/fa";

import './TicketDetails.css';
import { useEffect, useState } from "react";
import { getTicketThunk, updateTicketThunk, getMyTicketsThunk } from "../../store/tickets";
import { getAllStatusThunk } from "../../store/status";
import { getAllNotesThunk } from "../../store/notes";
import NoteCard from "../NoteCard";
import { getAllPartsThunk } from "../../store/parts";
import PartCard from "../PartCard/PartCard";

export default function TicketDetails() {
    const dispatch = useDispatch();

    const [noteChecker, setNoteChecker] = useState(false);
    const [myWorkTickets, setMyWorkTickets] = useState(false);
    const [deleteNoteChecker, setDeleteNoteChecker] = useState(false);
    const [deletePartChecker, setDeletePartChecker] = useState(false);

    const { ticketId } = useParams();

    const user = useSelector(state => state.session.user);
    const status = useSelector(state => state.status.allStatus);
    const notes = useSelector(state => state.notes.allNotes);
    const ticket = useSelector(state => state.tickets.ticket);
    const parts = useSelector(state => state.parts.allParts);

    const [ticketStatus, setTicketStatus] = useState(ticket.id);

    useEffect(() => {
        dispatch(getTicketThunk(parseInt(ticketId)));
        dispatch(getAllStatusThunk());
        dispatch(getAllNotesThunk());
        dispatch(getMyTicketsThunk());
        dispatch(getAllPartsThunk());
        // setNoteChecker(false);
        setDeleteNoteChecker(false);
        setDeletePartChecker(false);
    }, [dispatch, ticketId, noteChecker, deleteNoteChecker, myWorkTickets, deletePartChecker]);

    useEffect(() => {
        setNoteChecker(false)
    }, [noteChecker])

    useEffect(() => {
        setMyWorkTickets(false);
    }, [myWorkTickets])

    if (!ticket || !status || !user || !notes || !parts) return <span className="loader"></span>;

    // if(!notes) return <span className="loader"></span>;

    const newStatus = status.filter(status => status.id !== ticket.StatusInfo?.id);
    const notesForTicket = notes.filter(note => note.ticketId === ticket.id);
    const partsForTicket = parts.filter(part => part.Ticket?.id === ticket.id);

    const handleStatusChange = (e) => {
        dispatch(updateTicketThunk({ ...ticket, statusId: e.target.value, StatusInfo: status.find(status => status.id === parseInt(e.target.value)) }));
        setTicketStatus(e.target.value);
        setMyWorkTickets(true);
    }

    const onModalClose = () => {
        setNoteChecker(true);
        setDeleteNoteChecker(true);
        setDeletePartChecker(true);
    }

    console.log(partsForTicket, "PARTS FOR TICKET");

    return (
        <section className="ticket-details-tab">
            <div className="ticket-details-header">
                <div className="ticket-details-header-left">
                    <h1>{ticket.title}</h1>
                    <span>
                        {
                            ticket?.CreatedBy?.companyName === '' ? (
                                ticket.CreatedBy.firstName + ' ' + ticket.CreatedBy.lastName
                            ) : (
                                ticket.CreatedBy?.companyName
                            )
                        }
                    </span>
                    <div className="ticket-description-body" id="body-row">
                        <span style={{ color: "#f9f9f9" }}>
                            {
                                ticket.ClientInfo?.companyName !== "" ? (
                                    <div className='client-container-company' style={{ color: "#f9f9f9" }}>
                                        <FaBuilding />
                                        <span style={{ color: "#f9f9f9" }}>{ticket.ClientInfo?.companyName}</span>
                                    </div>
                                ) : (
                                    <div className='client-container-personal' style={{ color: "#f9f9f9" }}>
                                        <FaUser />
                                        <span style={{ textOverflow: "ellipsis", color: "f9f9f9" }}>{ticket.ClientInfo?.firstName} {ticket.ClientInfo?.lastName}</span>
                                    </div>
                                )
                            }
                        </span>
                    </div>
                </div>
                <div className="ticket-details-header-right">
                    <button className="edit-ticket-btn"><FaPen /></button>
                    <button className="delete-ticket-btn"><FaTrash /></button>
                </div>
            </div>
            <div className="ticket-description-body">
                <h3>Description</h3>
                <span>
                    {ticket.description}
                </span>
            </div>
            <div className="ticket-details-status">

                {
                    user.id === ticket.CreatedBy?.id ? (
                        <>
                            <h3>Status</h3>
                            <select
                                id="status"
                                value={ticketStatus}
                                onChange={(e) => handleStatusChange(e)}
                            >
                                <option value={ticket.StatusInfo?.id}>{ticket.StatusInfo?.name}</option>
                                {newStatus.map((status) => (
                                    <option key={status.id} value={status.id}> {status.name}</option>
                                ))}
                            </select>
                        </>
                    ) : (<></>)
                }

            </div>
            <section className="ticket-details-notes-parts" id="notes-parts">
                <div className="tickets-details-notes">
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: "40px", alignItems: "center" }}>
                        <h3>Notes</h3>
                        <button className="edit-ticket-btn" style={{ display: "flex", listStyle: "none", padding: "8px 10px", alignItems: "center" }}>
                            <OpenModalMenuItem
                                itemText={<FaPlusCircle />}
                                modalComponent={<AddNote userId={user.id} ticketId={ticket.id} setNotesChecker={setNoteChecker} />}
                                onModalClose={onModalClose}
                            ></OpenModalMenuItem>
                        </button>
                    </div>
                    <div className="notes-container" style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "300px", width: "100%" }}>
                        {
                            notesForTicket.length > 0 ? (
                                notesForTicket?.map(note => (
                                    <NoteCard key={note.id} note={note} setDeleteNoteChecker={setDeleteNoteChecker} />
                                ))
                            ) : (
                                <span>No notes for this ticket</span>
                            )
                        }
                    </div>
                </div>
                <div className="tickets-details-parts">
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: "40px", alignItems: "center" }}>
                        <h3>Parts</h3>
                        <button className="edit-ticket-btn"><FaPlusCircle /></button>
                    </div>
                    <div className="parts-container">
                        {
                            partsForTicket.length > 0 ? (
                                partsForTicket?.map(part => (
                                    <PartCard key={part.id} part={part} setDeletePartChecker={setDeletePartChecker} />
                                ))
                            ) : (
                                <span>No parts for this ticket</span>
                            )
                        }
                    </div>
                </div>
            </section>
        </section>
    )
}