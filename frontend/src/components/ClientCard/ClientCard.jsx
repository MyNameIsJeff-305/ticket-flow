import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";

import { useEffect } from "react";
import { getOneClientThunk } from "../../store/clients";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteClient from "../DeleteClient/DeleteClient";
import './ClientCard.css';
import EditClient from "../EditClient/EditClient";

export default function ClientCard({ client, setEditClientChecker, setDeleteClientChecker }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneClientThunk(client.id));
    }, [dispatch, client.id]);

    const clientType = client.companyName ? "company" : "individual";

    const handleDeleteClick = (e) => {
        e.stopPropagation();
    };

    const goToClientDetails = () => {
        navigate(`/clients/${client.id}`);
    }

    return (
        <div
            className={`client-card-${clientType}`}
        >
            <div className="client-card-left"
                onClick={goToClientDetails}
            >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
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
                <div className="edit-ticket-btn-ticket-card" style={{ zIndex: 10 }}>
                    <OpenModalMenuItem
                        modalComponent={
                            <EditClient
                                client={client}
                                setEditClientChecker={setEditClientChecker}
                            />}
                    >
                        <TiEdit />
                    </OpenModalMenuItem>
                </div>
                <div className="delete-ticket-btn-ticket-card" onClick={handleDeleteClick}>
                    <OpenModalMenuItem
                        modalComponent={
                            <DeleteClient
                                client={client}
                                setDeleteClientChecker={setDeleteClientChecker}
                            />}
                    >
                        <IoTrashOutline style={{ color: "var(--danger-color, #c33)", fontSize: "18px" }} />
                    </OpenModalMenuItem>
                </div>
            </div>
        </div>
    );
}