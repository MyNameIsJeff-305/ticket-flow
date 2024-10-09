import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteTicketThunk } from "../../store/tickets";

import "./ConfirmDeleteTicket.css";

export default function ConfirmDeleteTicket({ ticket, setDeleteTicketChecker }) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return dispatch(deleteTicketThunk(ticket.id))
            .then(() => {
                // navigate("/tickets"); // Navigate to /tickets after successful deletion
                setDeleteTicketChecker(true);
                closeModal();
            })
            .catch((error) => {
                console.error("Failed to delete ticket:", error);
            });
    };

    return (
        <div className="confirm-delete-container">
            <h3>Are you sure you want to delete this ticket?</h3>
            <div className="confirm-delete-buttons">
                <button onClick={handleDelete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    );
}