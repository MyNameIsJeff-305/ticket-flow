import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddNote from "../AddNote/AddNote";

import { FaBuilding, FaUser, FaPen, FaTrash, FaPlusCircle } from "react-icons/fa";

import './TicketDetails.css';
import { useEffect, useState } from "react";
import { getTicketThunk, updateTicketThunk } from "../../store/tickets";
import { getAllStatusThunk } from "../../store/status";
import { getAllNotesThunk } from "../../store/notes";
import NoteCard from "../NoteCard";

export default function TicketDetails() {
    const dispatch = useDispatch();

    const [noteChecker, setNoteChecker] = useState(false);
    const [deleteNoteChecker, setDeleteNoteChecker] = useState(false);

    const { ticketId } = useParams();

    const user = useSelector(state => state.session.user);
    const status = useSelector(state => state.status.allStatus);
    const notes = useSelector(state => state.notes.allNotes);
    const ticket = useSelector(state => state.tickets.ticket);

    const [ticketStatus, setTicketStatus] = useState(ticket.id);

    useEffect(() => {
        dispatch(getTicketThunk(parseInt(ticketId)));
        dispatch(getAllStatusThunk());
        dispatch(getAllNotesThunk());
        // setNoteChecker(false);
        setDeleteNoteChecker(false);
    }, [dispatch, ticketId, noteChecker, deleteNoteChecker]);

    useEffect(() => {
        setNoteChecker(false)
    }, [noteChecker])

    if (!ticket || !status || !notes || !user) return <div>Loading...</div>;

    const newStatus = status.filter(status => status.id !== ticket.StatusInfo?.id);
    const notesForTicket = notes.filter(note => note.ticketId === ticket.id);

    const handleStatusChange = (e) => {
        dispatch(updateTicketThunk({ ...ticket, statusId: e.target.value, StatusInfo: status.find(status => status.id === parseInt(e.target.value)) }));
        setTicketStatus(e.target.value)
    }

    const onModalClose = () => {
        setNoteChecker(true);
        setDeleteNoteChecker(true);
    }

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
            </div>
            <section className="ticket-details-notes-parts" id="notes-parts">
                <div className="tickets-details-notes">
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: "40px", alignItems: "center" }}>
                        <h3>Notes</h3>
                        <button className="edit-ticket-btn" style={{display:"flex", listStyle: "none", padding:"8px 10px", alignItems:"center" }}>
                            <OpenModalMenuItem
                                itemText={<FaPlusCircle />}
                                modalComponent={<AddNote userId={user.id} ticketId={ticket.id} setNotesChecker={setNoteChecker} />}
                                onModalClose={onModalClose}
                            ></OpenModalMenuItem>
                        </button>
                    </div>
                    <div className="notes-container" style={{ display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "scroll", maxHeight: "300px" }}>
                        {
                            notesForTicket?.map(note => (
                                <NoteCard key={note.id} note={note} setDeleteNoteChecker={setDeleteNoteChecker}/>
                            ))
                        }
                    </div>
                </div>
                <div className="tickets-details-parts">
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: "40px", alignItems: "center" }}>
                        <h3>Parts</h3>
                        <button className="edit-ticket-btn"><FaPlusCircle /></button>
                    </div>
                    <span>sladfh alsdhf lasdhf lsajdhf ljasdhf ljashdf ljsahdf lsahdfj lashdflj ashdfj lasdfh ljasdhf lsajdhf lj</span>
                </div>
            </section>
        </section>
    )
}