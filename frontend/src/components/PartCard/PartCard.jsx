import { FaPen, FaTrash } from "react-icons/fa";

import { useSelector } from "react-redux"

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useState } from "react";

export default function PartCard({ part, setDeletePartChecker }) {

    // const dispatch = useDispatch();

    const [partChecker, setPartChecker] = useState(false);

    const currentUser = useSelector(state => state.session.user);

    const onModalClose = () => {
        setPartChecker(true);
        setDeletePartChecker(true);
    }

    return (
        <section className="note-card">
            <div className="user-profile-pic">
                <img src={part.imageUrl} alt="profile-pic" />
            </div>
            <div className="note-card-content">
                <h3>{part.name}</h3>
                <span style={{ textOverflow: "ellipsis" }}>{part.description}</span>
            </div>
            <div className="note-buttons">
                {
                    currentUser.id === part.Ticket?.createdBy ? (
                        <>
                            <button className="edit-ticket-btn" style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                                <OpenModalMenuItem
                                    itemText={<FaPen />}
                                    modalComponent={<></>}
                                    onModalClose={onModalClose}
                                ></OpenModalMenuItem>

                            </button>
                            <button className="edit-ticket-btn" style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                                <OpenModalMenuItem
                                    itemText={<FaTrash />}
                                    modalComponent={<></>}
                                ></OpenModalMenuItem>
                            </button>
                        </>
                    ) : <></>
                }
            </div>
        </section>
    )
}