import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';

import './EditTicket.css';
import { getTicketThunk, updateTicketThunk } from '../../store/tickets';

export default function EditTicket() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [clientId, setClientId] = useState();
    const [loading, setLoading] = useState(true);

    const { closeModal } = useModal()

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { ticketId } = useParams();
    const ticket = useSelector(state => state.tickets.ticket);

    useEffect(() => {
        if (!ticket || ticket.id !== parseInt(ticketId)) {
            dispatch(getTicketThunk(parseInt(ticketId)))
                .then(() => setLoading(false))
        } else {
            setTitle(ticket.title || '');
            setDescription(ticket.description || '');
            setClientId(ticket.clientId || '');
        }
    }, [ticketId, ticket, dispatch]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const updatedTicket = {
            title,
            description,
            clientId
        }

        let newErrors = {};

        if (!title) newErrors.title = 'Title is required';

        if(Object.keys(newErrors).length === 0) {
            setIsButtonDisabled(true);
            setErrors(newErrors);
        }

        dispatch(updateTicketThunk(updatedTicket))

        setLoading(false);
    }

}