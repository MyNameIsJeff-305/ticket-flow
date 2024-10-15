import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import './AddTicket.css';

import { getAllClientsThunk } from '../../store/clients';
import { addTicketThunk } from '../../store/tickets';

export default function AddTicket({ setTicketsChecker }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState(null);

    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    const clients = useSelector(state => state.clients.allClients);

    useEffect(() => {
        setTitle('');
        setDescription('');
        setClientId(null);
        setErrors({});
        setIsButtonDisabled(true);
    }, []);

    useEffect(() => {
        dispatch(getAllClientsThunk());
    }, [dispatch]);

    useEffect(() => {
        let newErrors = {};

        if (!title || title === '') {
            newErrors.title = 'Please enter a title';
        }
        if (!clientId) {
            newErrors.clientId = 'Please select a client';
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [title, clientId]);

    if (!clients) return <div>Loading...</div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(addTicketThunk({ title, description, clientId }))
            .then(() => {
                setTicketsChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <form className='add-ticket-form' onSubmit={handleSubmit}>
            <h1>Add Ticket</h1>
            <div className='add-ticket-form-inputs'>
                <div className='add-ticket-form-input'>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className='add-ticket-form-error'>{errors.title}</div>}
                </div>
                <div className='add-ticket-form-input'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='add-ticket-form-input'>
                    <label htmlFor='client'>Client</label>
                    <select
                        id='client'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        <option value=''>Select a client</option>
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
                    {errors.clientId && <div className='add-ticket-form-error'>{errors.clientId}</div>}
                </div>
            </div>
            <button type='submit' disabled={isButtonDisabled}>Add Ticket</button>
        </form>
    )
}
