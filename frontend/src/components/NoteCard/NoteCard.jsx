import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../../store/session";

import { FaPen, FaTrash } from "react-icons/fa";


import './NoteCard.css';

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import EditNote from "../EditNote";
import ConfirmDeleteNote from "../ConfirmDeleteNote";

export default function NoteCard({ note, setDeleteNoteChecker }) {
    const dispatch = useDispatch();

    const [noteChecker, setNoteChecker] = useState(false);
    // const [deleteNoteChecker, setDeleteNoteChecker] = useState(false);

    const users = useSelector(state => state.session.allUsers);
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllUsersThunk());
        setNoteChecker(false)
        setDeleteNoteChecker(false)
    }, [dispatch, noteChecker, setNoteChecker, setDeleteNoteChecker]);

    if (!users || users.length === 0 || !currentUser) return null;

    const user = users.find(user => user.id === note.userId);

    const onModalClose = () => {
        setNoteChecker(true);
        setDeleteNoteChecker(true);
    }

    return (
        <section className="note-card">
            <div className="user-profile-pic">
                <img src={user.profilePicUrl} alt="profile-pic" />
            </div>
            <div className="note-card-content">
                <span style={{ textOverflow: "ellipsis" }}>{note.note}</span>
            </div>
            <div className="note-buttons">
                {
                    currentUser.id === note.userId ? (
                        <>
                            <div className="edit-ticket-btn" style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                                <OpenModalMenuItem
                                    itemText={<FaPen />}
                                    modalComponent={<EditNote setNoteChecker={setNoteChecker} note={note} />}
                                    onModalClose={onModalClose}
                                ></OpenModalMenuItem>

                            </div>
                            <div className="edit-ticket-btn" style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                                <OpenModalMenuItem
                                    itemText={<FaTrash />}
                                    modalComponent={<ConfirmDeleteNote setDeleteNoteChecker={setDeleteNoteChecker} note={note} />}
                                ></OpenModalMenuItem>
                            </div>
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}