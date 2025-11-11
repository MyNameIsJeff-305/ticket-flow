import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { deactivateUserThunk } from '../../../store/session';

import './DeleteEmployee.scss';

export default function DeleteEmployee({ employee, setDeleteEmployeeChecker }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return dispatch(deactivateUserThunk(employee))
            .then(() => {
                setDeleteEmployeeChecker(true);
                closeModal();
            });
    }

    return (
        <div className='confirm-delete-container'>
            <h1>Are you sure you want to delete this employee?</h1>
            <p>(All Tickets related to this employee will be deleted as well)</p>
            <div className='confirm-delete-buttons'>
                <button onClick={(e) => handleDelete(e)}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}