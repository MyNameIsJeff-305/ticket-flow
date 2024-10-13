import { useDispatch } from "react-redux";
import { FaTrash, FaPen } from "react-icons/fa";
import { useEffect } from "react";
import { getOneClientThunk } from "../../store/clients";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteClient from "../DeleteClient/DeleteClient";
import './ClientCard.css';
import EditClient from "../EditClient/EditClient";

export default function ClientCard({ client, setEditClientChecker, setDeleteClientChecker }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneClientThunk(client.id));
    }, [dispatch, client.id]);

    const clientType = client.companyName ? "company" : "individual";

    const handleDeleteClick = (e) => {
        // Prevent the event from propagating to the parent card div
        e.stopPropagation();
    };

    return (
        <div
            className={`client-card-${clientType}`}
        >
            <div className="client-card-left">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                    <img className="client-profile" src={client.profilePicUrl} alt="profile-pic" />
                    {
                        client.companyName !== "" ? (
                            <h3 style={{ textOverflow: "ellipsis" }}>
                                {client.companyName}
                            </h3>
                        ) : (
                            <h3 style={{ textOverflow: "ellipsis" }}>
                                {client.firstName + " " + client.lastName}
                            </h3>
                        )
                    }
                </div>
            </div>
            <div className="client-card-right">
            <div className="edit-ticket-btn-ticketcard">
                    <OpenModalMenuItem
                        itemText={<FaPen />}
                        modalComponent={<EditClient client={client} setEditClientChecker={setEditClientChecker} />}
                    />
                </div>
                <div className="edit-ticket-btn-ticketcard" onClick={handleDeleteClick}>
                    <OpenModalMenuItem
                        itemText={<FaTrash />}
                        modalComponent={<DeleteClient client={client} setDeleteClientChecker={setDeleteClientChecker} />}
                    />
                </div>
            </div>
        </div>
    );
}