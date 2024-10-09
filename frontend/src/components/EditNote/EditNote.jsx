import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";

import { editNoteThunk } from "../../store/notes";

export default function EditNote({ note, setNoteChecker }) {
    const dispatch = useDispatch();

    const [updatedNote, setUpdatedNote] = useState(note.note);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        setUpdatedNote(note.note);
        setErrors({});
        setIsButtonDisabled(true);
    }, [note.note]);

    useEffect(() => {
        let newErrors = {};

        if (!updatedNote || updatedNote === "") {
            newErrors.title = "Please enter a Note"
        }

        if(updatedNote === note.note) {
            newErrors.title = "Please enter a new Note"
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [note.note, updatedNote])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const newUpdatedNote = {
            id: note.id,
            note: updatedNote,
            ticketId: note.ticketId,
            userId: note.userId
        }

        return dispatch(editNoteThunk(newUpdatedNote))
            .then(() => {
                setNoteChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data.message);
                }
            });
    }

    return (
        <form className='add-note-form' onSubmit={handleSubmit}>
            <h3>Edit Note</h3>
            <label htmlFor='note'>Note</label>
            <input
                id='note'
                type='text'
                value={updatedNote}
                onChange={(e) => setUpdatedNote(e.target.value)}
            />
            {errors.title && <div className='add-note-form-error'>{errors.title}</div>}
            <button type='submit' disabled={isButtonDisabled}>Save</button>
        </form>
    )
}