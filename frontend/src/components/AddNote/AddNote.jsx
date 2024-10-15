import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import './AddNote.css';

import { addNoteThunk } from '../../store/notes';

export default function AddNote({ userId, ticketId, setNotesChecker }) {
    const dispatch = useDispatch();

    const [note, setNote] = useState('');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal()

    useEffect(() => {
        setNote('');
        setErrors({});
        setIsButtonDisabled(true);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (!note || note === "") {
            newErrors.title = "Please enter a note"
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [note])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const newNote = {
            note: note,
            ticketId: ticketId,
            userId: userId
        }

        return dispatch(addNoteThunk(newNote))
            .then(() => {
                setNotesChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                console.log(data, "THIS IS DATA");
                if (data && data.message) {
                    setErrors(data.message);
                }
            });
    }

    return (
        <form className='add-note-form' onSubmit={handleSubmit}>
            <h3>Add a Note</h3>
            <label htmlFor='note'>Note</label>
            <input
                id='note'
                type='text'
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            {errors.title && <div className='add-note-form-error'>{errors.title}</div>}
            <button type='submit' disabled={isButtonDisabled}>Save</button>
        </form>
    )
}