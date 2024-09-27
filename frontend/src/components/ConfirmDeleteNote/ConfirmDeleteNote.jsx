import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteNoteThunk } from '../../store/notes';

import './ConfirmDeleteNote.css';

export default function ConfirmDeleteNote({ note, setDeleteNoteChecker }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return dispatch(deleteNoteThunk(note.id))
            .then(() => {
                setDeleteNoteChecker(true)
                closeModal();
            })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h3>Are you sure you want to delete this note?</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button onClick={(e) => handleDelete(e)}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    );
}