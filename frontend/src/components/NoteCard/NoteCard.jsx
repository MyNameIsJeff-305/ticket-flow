import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersThunk } from "../../store/session";

import { FaPen, FaTrash } from "react-icons/fa";


import './NoteCard.css';

export default function NoteCard({ note }) {
    const dispatch = useDispatch();

    const users = useSelector(state => state.session.allUsers);

    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    if (!users || users.length === 0) return <div>Loading...</div>;

    const user = users.find(user => user.id === note.userId);

    return (
        <section className="note-card">
            <div className="user-profile-pic">
                <img src={user.profilePicUrl} alt="profile-pic" />
            </div>
            <div className="note-card-content">
                <span>{note.note}</span>
            </div>
            <div className="note-buttons">
                {
                    user.id !== note.userId ? (
                        <>
                            <button><FaPen /></button>
                            <button><FaTrash /></button>
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}