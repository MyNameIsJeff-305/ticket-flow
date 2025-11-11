import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../../../store/session";

import { FaPen, FaTrash } from "react-icons/fa";

import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

import EditNote from "../../EditNote";
import ConfirmDeleteNote from "../../ConfirmDeleteNote";

import './TicketNoteCard.scss';

interface TicketNoteCardProps {
    note: any;
    setDeleteNoteChecker: any;
}

export default function TicketNoteCard({ note, setDeleteNoteChecker }: TicketNoteCardProps) {
    const dispatch = useDispatch();

    const [noteChecker, setNoteChecker] = useState(false);

    const users = useSelector((state: any) => state.session.allUsers);
    const currentUser = useSelector((state: any) => state.session.user);

    useEffect(() => {
        dispatch(getAllUsersThunk() as any);
        setNoteChecker(false)
        setDeleteNoteChecker(false)
    }, [dispatch, noteChecker, setNoteChecker, setDeleteNoteChecker]);

    if (!users || users.length === 0 || !currentUser) return null;

    const user = users.find((user: any) => user.id === note.userId);

    const onModalClose = () => {
        setNoteChecker(true);
        setDeleteNoteChecker(true);
    }

    return (
        <div className="ticket-note-wrapper">
            <div className="user-image" title={user.firstName + " " + user.lastName}>
                <img src={user.profilePicUrl} alt="profile-pic" />
            </div>

            <div className={`ticket-note-card ${currentUser.id === note.userId ? 'own-note' : ''}`}>
                <div className="note-header">
                    <div className="note-timestamp">
                        {new Date(note.createdAt).toLocaleString()}
                    </div>

                    <div className="note-actions">
                        {currentUser.id === note.userId && (
                            <>
                                <OpenModalMenuItem
                                    modalComponent={<EditNote setNoteChecker={setNoteChecker} note={note} />}
                                    onModalClose={onModalClose}
                                >
                                    <button className="btn btn-action">
                                        <FaPen className="btn-icon-icon" />
                                    </button>
                                </OpenModalMenuItem>

                                <OpenModalMenuItem
                                    modalComponent={<ConfirmDeleteNote setDeleteNoteChecker={setDeleteNoteChecker} note={note} />}
                                >
                                    <button className="btn btn-action btn-danger">
                                        <FaTrash className="btn-icon-icon" />
                                    </button>
                                </OpenModalMenuItem>
                            </>
                        )}
                    </div>
                </div>

                <div className="note-content">
                    {note.note}
                </div>
            </div>
        </div>
    );
}