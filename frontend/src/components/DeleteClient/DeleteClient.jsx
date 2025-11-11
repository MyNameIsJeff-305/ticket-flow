import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteClientThunk } from "../../store/clients";

import "./DeleteClient.scss";

export default function DeleteClient({ client, setDeleteClientChecker }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return dispatch(deleteClientThunk(client.id))
            .then(() => {
                setDeleteClientChecker(true);
                closeModal();
            });
    }

    return (
        <div className="confirm-delete-container">
            <h1>Are you sure you want to delete this client? </h1>
            <p>(All Tickets related to this client will be deleted as well)</p>
            <div className="confirm-delete-buttons">
                <button onClick={(e) => handleDelete(e)}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    );
}