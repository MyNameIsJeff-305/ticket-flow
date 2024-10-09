import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';

import './EditTicket.css';
import { updateTicketThunk } from '../../store/tickets';
import { getAllClientsThunk } from '../../store/clients';

export default function EditTicket({ setTicketChecker }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const { ticketId } = useParams();

    const ticket = useSelector(state => state.tickets.ticket);
    const clients = useSelector(state => state.clients.allClients);

    useEffect(() => {
        const fetchTicketAndClients = async () => {
            try {
                await dispatch(getAllClientsThunk());
                // await dispatch(getTicketThunk(parseInt(ticketId)));
            } finally {
                setLoading(false);
                setTitle(ticket.title || '');
                setDescription(ticket.description || '');
                setClientId(ticket.ClientInfo.id || '');
            }
        };

        if (!ticket || ticket.id !== parseInt(ticketId)) {
            fetchTicketAndClients();
        } else {
            setTitle(ticket.title || '');
            setDescription(ticket.description || '');
            setClientId(ticket.clientId || '');
            setLoading(false);
        }
    }, [ticketId, ticket, dispatch]);

    useEffect(() => {
        // Validate form inputs
        let newErrors = {};
        if (!title) newErrors.title = 'Please enter a title';
        if (!clientId) newErrors.clientId = 'Please select a client';

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [title, clientId]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedTicket = {
            id: parseInt(ticket.id), // Include ticket ID for the update
            title: title || ticket.title,
            description: description || ticket.description,
            clientId: clientId
        };

        let newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!clientId) newErrors.clientId = 'Client ID is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        return dispatch(updateTicketThunk(updatedTicket))
            .then(() => {
                setTicketChecker(true); // Inform parent component to re-fetch tickets
                closeModal();
            })
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })
    };

    if (loading || !clients) {
        return <div className='edit-ticket-form'><span className="loader"></span></div>;
    }

    return (
        <form className='edit-ticket-form' onSubmit={handleOnSubmit}>
            <h1>Edit Ticket</h1>
            <div className='edit-ticket-form-inputs'>
                <div className='edit-ticket-form-input'>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className='edit-ticket-form-error'>{errors.title}</div>}
                </div>
                <div className='edit-ticket-form-input'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='edit-ticket-form-input'>
                    <label htmlFor='client'>Client</label>
                    <select
                        id='client'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        {
                            clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.firstName === '' ? (
                                        `${client.companyName}`
                                    ) : (
                                        `${client.firstName} ${client.lastName}`
                                    )}
                                </option>
                            ))
                        }
                    </select>
                    {errors.clientId && <div className='edit-ticket-form-error'>{errors.clientId}</div>}
                </div>
            </div>
            <button type='submit' disabled={isButtonDisabled}>Update Ticket</button>
        </form>
    );
}
