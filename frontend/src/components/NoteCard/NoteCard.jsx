import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../../store/session";

import { FaPen, FaTrash } from "react-icons/fa";


import './NoteCard.css';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddNote from "../AddNote/AddNote";
import EditNote from "../EditNote";

export default function NoteCard({ note }) {
    const dispatch = useDispatch();

    const [noteChecker, setNoteChecker] = useState(false)

    const users = useSelector(state => state.session.allUsers);
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllUsersThunk());
        setNoteChecker(false)
    }, [dispatch, noteChecker]);

    if (!users || users.length === 0 || !currentUser) return <div>Loading...</div>;

    const user = users.find(user => user.id === note.userId);

    const onModalClose = () => {
        setNoteChecker(true);
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
                            <button className="edit-ticket-btn" style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                                <OpenModalMenuItem
                                    itemText={<FaPen />}
                                    modalComponent={<EditNote setNoteChecker={setNoteChecker} note={note} />}
                                    onModalClose={onModalClose}
                                ></OpenModalMenuItem>

                            </button>
                            <button><FaTrash /></button>
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}