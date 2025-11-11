import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";

import moment from "moment";

import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import AddNote from "../../AddNote/AddNote";
import AssignToClient from "./AssignToClient";

import { FaPlus, FaPhone } from "react-icons/fa";
import { BsBuildingsFill, BsFillPersonFill } from "react-icons/bs";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineCall, MdOutlineDownload, MdOutlineCalendarMonth, MdOutlineAccessTime } from "react-icons/md";

import OpenModalButton from "../../OpenModalButton";

import { getTicketThunk, updateTicketThunk, getMyTicketsThunk } from "../../../store/tickets";
import { getAllStatusThunk } from "../../../store/status";
import { getAllNotesThunk } from "../../../store/notes";
import { getAllPartsThunk } from "../../../store/parts";
import TicketPartCard from "../TicketPartCard";

import TicketQR from "./TicketQR";
import AudioPlayer from "./AudioPlayer";
import TicketEmployees from "./TicketEmployees";
import TicketNoteCard from "../TicketNoteCard/TicketNoteCard";

import { formatPhoneNumber } from "../../../utils/helperFunctions";

import './TicketDetails.scss';
import { FaTicket } from "react-icons/fa6";

export default function TicketDetails() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const ulRef = useRef<HTMLUListElement>(null);

    const [noteChecker, setNoteChecker] = useState(false);
    const [myWorkTickets, setMyWorkTickets] = useState(false);

    const [partsChecker, setPartsChecker] = useState(false);
    const [ticketChecker, setTicketChecker] = useState(false);

    const [deleteNoteChecker, setDeleteNoteChecker] = useState(false);
    const [deletePartChecker, setDeletePartChecker] = useState(false);

    const [assignToClient, setAssignToClient] = useState(false);

    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const { ticketId } = useParams();

    const user = useSelector((state: any) => state.session.user);
    const status = useSelector((state: any) => state.status.allStatus);
    const notes = useSelector((state: any) => state.notes.allNotes);
    const ticket = useSelector((state: any) => state.tickets.ticket);
    const parts = useSelector((state: any) => state.parts.allParts);

    const [ticketStatus, setTicketStatus] = useState(ticket.id);

    const toggleMenu = (e: any) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowStatusMenu(!showStatusMenu);
    }

    useEffect(() => {
        dispatch(getTicketThunk(parseInt(ticketId || '')) as any);
        dispatch(getAllStatusThunk() as any);
        dispatch(getAllNotesThunk() as any);
        dispatch(getMyTicketsThunk() as any);
        dispatch(getAllPartsThunk() as any);
        setTicketChecker(false);
        setDeleteNoteChecker(false);
        setPartsChecker(false);
        setDeletePartChecker(false);
        setAssignToClient(false);
    }, [dispatch, ticketId, noteChecker,
        deleteNoteChecker, myWorkTickets,
        deletePartChecker, partsChecker,
        ticketChecker, assignToClient]);

    useEffect(() => {
        setNoteChecker(false)
    }, [noteChecker])

    useEffect(() => {
        setPartsChecker(false);
    }, [partsChecker])

    useEffect(() => {
        setMyWorkTickets(false);
    }, [myWorkTickets])

    useEffect(() => {
        if (!showStatusMenu) return;

        const closeMenu = (e: any) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowStatusMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showStatusMenu]);

    const ulClassName = "status-dropdown-menu" + (showStatusMenu ? "" : "-hidden");

    if (!ticket || !status || !user || !notes || !parts) return <div className="ticket-details-tab"><span className="loader"></span></div>;

    const newStatus = status.filter((status: any) => status.id !== ticket.StatusInfo?.id);
    const notesForTicket = notes.filter((note: any) => note.ticketId === ticket.id);
    const partsForTicket = parts.filter((part: any) => part.Ticket?.id === ticket.id);

    const handleStatusChange = (e: any) => {
        dispatch(updateTicketThunk(ticket.id, { ...ticket, statusId: parseInt(e.target.value), StatusInfo: status.find((status: any) => status.id === parseInt(e.target.value)) }) as any);
        setTicketStatus(parseInt(e.target.value));
        setMyWorkTickets(true);
        setShowStatusMenu(false);
    }

    const onModalClose = () => {
        setNoteChecker(true);
        setDeleteNoteChecker(true);
        setAssignToClient(true);
    }

    const onModalCloseTickets = () => {
        setTicketChecker(true);
    }

    const onModalCloseParts = () => {
        setPartsChecker(true);
        setDeletePartChecker(true);
    }

    const clientClassName = ticket.ClientInfo?.companyName === "" ? "individual-client" : "company-client";

    const getPhoneDirectoryOfAClient = () => {
        const result = [];
        ticket.ClientInfo?.Locations?.forEach((location: any) => {
            location.PhoneNumbers?.forEach((phoneNumber: any) => {
                result.push(phoneNumber);
            });
        });

        result.push({ phoneNumber: ticket.ClientInfo?.phone, phoneType: "Main" });
        return result;
    }

    const phoneDirectory = getPhoneDirectoryOfAClient();

    const selectedContactInfo: { phoneNumber?: string; phoneType?: string, locationName?: string } = {};

    if (ticket.CallInfo?.length > 0) {
        phoneDirectory.forEach((contactInfo: { phoneNumber: string; phoneType: string; }) => {
            if (contactInfo.phoneNumber === ticket?.CallInfo[0]?.caller) {
                selectedContactInfo['phoneNumber'] = contactInfo.phoneNumber;
                selectedContactInfo['phoneType'] = contactInfo.phoneType;
                selectedContactInfo['locationName'] = ticket.CallInfo[0]?.locationName;
            }
        });
    } else {
        Object.assign(selectedContactInfo, { phoneNumber: ticket.ClientInfo?.phone, phoneType: "Client Phone" });
    }

    const handleDownloadAudio = () => {
        if (ticket.CallInfo?.length > 0) {
            const recordingUrl = ticket.CallInfo[0]?.recordingUrl;
            if (recordingUrl) {
                const link = document.createElement('a');
                link.href = recordingUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

    const locationInfoExists = selectedContactInfo.locationName ? `exists` : "";

    return (
        <section className="ticket-details">
            <div className="section-header">
                <div className="ticket-title-and-status">
                    <h1>
                        {ticket.title}
                    </h1>
                    <span
                        className="ticket-status"
                        title={ticket.StatusInfo?.description}
                        style={{ backgroundColor: ticket.StatusInfo?.color }}
                        onClick={toggleMenu}
                    >
                        <FaTicket />
                        {ticket.StatusInfo?.name}
                        <HiOutlineChevronDown className="status-dropdown-icon" />
                    </span>
                    {ticket ? (
                        <ul className={ulClassName} ref={ulRef}>
                            {newStatus.map((statusOption: any) => (
                                <li key={statusOption.id}>
                                    <button
                                        className={`status-option-button-${statusOption.id}`}
                                        value={statusOption.id}
                                        onClick={(e) => handleStatusChange(e)}
                                    >
                                        <FaTicket />
                                        <span
                                            className="status-color-indicator"
                                            style={{ backgroundColor: statusOption.color }}
                                        ></span>
                                        {statusOption.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (null)}
                </div>
            </div>

            <div className="ticket-details-container">
                <div className="ticket-info">
                    <h2>Ticket Info</h2>
                    <div className="ticket-description">
                        <div className="description-title">Description</div>
                        <div className="description-content">{ticket.description}</div>
                    </div>
                    <TicketEmployees author={ticket.CreatedBy} employees={ticket.AssignedEmployees} />
                </div>
                <div className="client-right-info">
                    <div className="client-information-right-info">
                        <h2>Client Info</h2>
                        {ticket.ClientInfo?.id === 28 ? ( //Anonymous Client Case
                            <div className="client-caller-details">
                                <div
                                    className="caller-info"
                                    onClick={() => { window.location.href = `tel:${ticket.CallInfo[0]?.caller}`; }}
                                >
                                    {/* Search for Caller Number in ticket.CallInfo[0] */}
                                    <div className="phone-button">
                                        <FaPhone />
                                    </div>
                                    <div className="phone-number-and-title">
                                        <span className="phone-number-label">{formatPhoneNumber(ticket.CallInfo[0]?.caller)}</span>
                                    </div>
                                </div>
                                <div className="assign-client">
                                    <OpenModalMenuItem
                                        modalComponent={<AssignToClient setAssignToClient={setAssignToClient} />}
                                        onModalClose={onModalClose}
                                    >
                                        <IoPersonAddOutline className="assign-client-icon" />
                                        Assign Client
                                    </OpenModalMenuItem>
                                </div>
                            </div>) : ( // Assigned Client Case
                            <div className="client-caller-details">
                                {ticket.ClientInfo?.companyName === "" ? (
                                    <div className="client">
                                        <div className="client-image">
                                            {ticket.ClientInfo?.profilePicUrl ?
                                                <img src={ticket.ClientInfo?.profilePicUrl} alt="Client" /> :
                                                <BsFillPersonFill />
                                            }
                                        </div>
                                        <div className="client-info">
                                            <div className="client-name">
                                                {ticket.ClientInfo?.firstName} {ticket.ClientInfo?.lastName}
                                            </div>
                                        </div>
                                    </div>) : (
                                    <div className={`client-${clientClassName}`}>
                                        <div className="client-image">
                                            <BsBuildingsFill />
                                        </div>
                                        <div className="client-info">
                                            <div className="client-name">
                                                {ticket.ClientInfo?.companyName}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="caller-info-ticket">
                                    <div className="location-name-location-phone" onClick={() => { window.location.href = `tel:${ticket.CallInfo[0]?.caller}`; }}>
                                        <div className={`caller-location-name-${locationInfoExists}`}>
                                            <span> {selectedContactInfo.locationName} </span>
                                        </div>
                                        <div className="caller-location-phone-number">
                                            <div className="caller-location-phone-type">
                                                <span>{selectedContactInfo.phoneType}</span>
                                            </div>
                                            <div className="caller-location-phone-number-number">
                                                <span>{formatPhoneNumber(selectedContactInfo.phoneNumber)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="share-container">
                        <div className="ticket-call-info-header">
                            <h2>Call Info</h2>
                            {ticket.Recordings?.length > 0 && (
                                <a className="download-audio" href={ticket.Recordings[0]?.recordingUrl}>
                                    <MdOutlineDownload />
                                    <span>Download Audio</span>
                                </a>
                            )}
                        </div>
                        <div className="call-time-and-date">
                            <div className="call-icon">
                                <MdOutlineCall />
                                {ticket.CallInfo?.length > 0 ? moment(ticket.CallInfo[0]?.createdAt).fromNow() : "N/A"}
                            </div>
                            <div className="call-date">
                                <MdOutlineCalendarMonth />
                                {ticket.CallInfo?.length > 0 ? moment(ticket.CallInfo[0]?.createdAt).format('YYYY-MM-DD') : "N/A"}
                                {/* {moment(TESTING_RECORDING.recordingStartTime).format('YYYY-MM-DD')} */}
                            </div>
                            <div className="call-time">
                                <MdOutlineAccessTime />
                                {ticket.CallInfo?.length > 0 ? moment(ticket.CallInfo[0]?.createdAt).format('hh:mm A') : "N/A"}
                                {/* {moment(TESTING_RECORDING.recordingStartTime).format('HH:mm A')} */}
                            </div>
                        </div>
                        {ticket.Recordings?.length > 0 ? (
                            <div className="audio-player-container">
                                <AudioPlayer
                                    audioPlayerUrl={ticket.Recordings[0]?.recordingUrl}
                                // audioPlayerUrl={"https://api.twilio.com/2010-04-01/Accounts/AC472ce832975154f3d5a7c3d7df0555c2/Recordings/RE1171b72c4e1c09ca93e1e35e842d3807"}
                                />
                            </div>
                        ) : (
                            <div className="no-audio-placeholder">
                                <span>No audio recording available for this ticket.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="notes-and-parts">
                <div className="notes-container">
                    <div className="notes-header">
                        <div className="notes-title">Notes</div>
                        <OpenModalMenuItem
                            modalComponent={<AddNote userId={user.id} ticketId={ticket.id} setNotesChecker={setNoteChecker} />}
                            onModalClose={onModalClose}
                        >
                            <button className="btn btn-icon btn-add-note" title="Add Note to Ticket">
                                <FaPlus className="btn-icon-icon" />
                            </button>
                        </OpenModalMenuItem>
                    </div>
                    <div className="notes-list">
                        {
                            notesForTicket.length > 0 ? (
                                notesForTicket?.map((note: any) => (
                                    <TicketNoteCard key={note.id} note={note} setDeleteNoteChecker={setDeleteNoteChecker} />
                                ))
                            ) : (
                                <span>No notes for this ticket</span>
                            )
                        }
                    </div>
                </div>

                <div className="parts-container">
                    <div className="parts-header">
                        <div className="parts-title">Parts</div>
                        <button className="btn btn-icon btn-add-part" title="Add Part to Ticket">
                            <FaPlus className="btn-icon-icon" />
                        </button>
                    </div>
                    {ticket.Parts?.length > 0 ?
                        <div className="parts-list">
                            {
                                ticket.Parts.map((part: any) => (
                                    <TicketPartCard key={part.id} part={part} setDeletePartChecker={setDeletePartChecker} ticketAuthor={ticket.CreatedBy?.id} setPartsChecker={setPartsChecker} />
                                ))
                            }
                        </div> :
                        <div className="no-parts-placeholder">No parts for this ticket</div>
                    }
                </div>
            </div>
        </section>
    );
}